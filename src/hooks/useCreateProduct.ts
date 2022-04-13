import { useState, useEffect } from 'react'
import { useProducts } from '../contexts/productsContext/ProductsContext'
import { ProductFields } from '../types/products'

type UseCreateProduct = (
  values: ProductFields,
  errors: boolean,
  handleClose: () => void
) => ({
  createProductErrors: string[]
  loading: boolean
})

const useCreateProduct: UseCreateProduct = (values, errors, handleClose) => {
  // state
  const [createProductErrors, setCreateProductErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { uploadProduct } = useProducts()

  useEffect(() => {
    if (errors) return
    createProduct()
  }, [values, errors])

  const createProduct = () => {
    const errors: string[] = []
    setCreateProductErrors([])
    setLoading(true)

    uploadProduct(values)
        .then(() => {
          handleClose()
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          error.push('Не удалось создать продукт!')
          setLoading(false)
        })

    setCreateProductErrors(errors)
  }

  return { createProductErrors, loading }
}

export default useCreateProduct
