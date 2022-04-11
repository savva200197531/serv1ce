import { useState, useEffect } from 'react'
import { useProducts } from '../contexts/productsContext/ProductsContext'
import { ProductFields } from '../types/products'
import { v4 } from 'uuid'

type UseCreateProduct = (values: ProductFields, errors: boolean) => ({
  createProductErrors: string[]
  loading: boolean
})

const useCreateProduct: UseCreateProduct = (values, errors) => {
  // state
  const [createProductErrors, setCreateProductErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { uploadProduct, uploadImg } = useProducts()

  useEffect(() => {
    if (errors) return
    createProduct()
  }, [values, errors])

  const createProduct = () => {
    const id = v4()
    const errors: string[] = []
    const { name, description, cost, imgFile } = values
    setCreateProductErrors([])

    setLoading(true)

    uploadProduct(name, description, cost, id)
        .finally(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          error.push('Не удалось загрузить данные!')
          setLoading(false)
        })

    uploadImg(imgFile, id)
        .finally(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          error.push('Не удалось загрузить изображение!')
          setLoading(false)
        })

    setCreateProductErrors(errors)
  }

  return { createProductErrors, loading }
}

export default useCreateProduct
