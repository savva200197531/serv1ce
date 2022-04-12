import React, { useContext, useState } from 'react'
import { ProductsContextProps, UploadImg, UploadProduct } from './types'
import { ref as storageRef, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, set, push, get } from 'firebase/database'
import { db, storage } from '../../firebase-config'
import { Product } from '../../types/products'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const imagesRef = (id = '') => storageRef(storage, `productImages/${id}`)
  const productsRef = databaseRef(db, 'products')

  const uploadProduct: UploadProduct = (name, description, cost, id) => {
    const ref = push(productsRef)
    return set(ref, {
      name,
      description,
      cost,
      id,
    })
  }

  const uploadImg: UploadImg = (imgFile: File, id) => {
    const ref = imagesRef(id)
    return uploadBytes(ref, imgFile)
  }

  const loadProducts = () => {
    setLoading(true)
    setProducts([])
    get(productsRef).then(snapshot => {
      listAll(imagesRef()).then(res => {
        res.items.forEach((item, index: number) => {
          getDownloadURL(item).then((url) => {
            setProducts(prev => [...prev, {
              ...Object.values(snapshot.val())[index] as Product,
              url,
            }])
          })
        })
      }).finally(() => {
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
    }).catch(error => {
      console.log(error)
    })
  }

  const value = {
    uploadProduct,
    uploadImg,
    loadProducts,
    loading,
    products,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
