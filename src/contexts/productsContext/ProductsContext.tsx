import React, { useContext } from 'react'
import { ProductsContextProps, UploadImg, UploadProduct } from './types'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../firebase-config'
import { ref as databaseRef, set, push } from 'firebase/database'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

export const ProductsProvider: React.FC = ({ children }) => {
  const uploadProduct: UploadProduct = (name, description, cost, id) => {
    const ref = push(databaseRef(db, 'products'))
    return set(ref, {
      name,
      description,
      cost,
      id,
    })
  }

  const uploadImg: UploadImg = (imgFile: File, id) => {
    const ref = storageRef(storage, `images/${id}`)
    return uploadBytes(ref, imgFile)
  }

  const value = {
    uploadProduct,
    uploadImg,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
