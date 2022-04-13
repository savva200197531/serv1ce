import React, { useContext, useEffect, useState } from 'react'
import { ProductsContextProps, UploadProduct } from './types'
import { ref as storageRef, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, set, push, get, onChildAdded, onValue } from 'firebase/database'
import { db, storage } from '../../firebase-config'
import { Product } from '../../types/products'
import { v4 } from 'uuid'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const imagesRef = (id = '') => storageRef(storage, `productImages/${id}`)
  const productsRef = databaseRef(db, 'products')

  const uploadProduct: UploadProduct = (value) => {
    const id = v4()

    return uploadBytes(imagesRef(id), value.imgFile)
        .then(() => getDownloadURL(imagesRef(id)))
        .then(url => set(push(productsRef), {
          ...value,
          url,
        }))
  }

  const watchProducts = () => {
    setLoading(true)

    onValue(productsRef, (snapshot) => {
      if (!snapshot.exists()) {
        return setLoading(false)
      }
      const value = snapshot.val()
      setProducts(Object.keys(value).map(key => ({
        ...value[key],
        id: key,
      })))
      setLoading(false)
    })
  }

  useEffect(() => {
    watchProducts()
  }, [])


  const value = {
    uploadProduct,
    loading,
    products,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
