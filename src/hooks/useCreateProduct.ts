import { useState, useEffect } from 'react'
import { useProducts } from '../contexts/productsContext/ProductsContext'
import { ProductFields } from '../types/products'
import { v4 } from 'uuid'

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
  const [productSuccess, setProductSuccess] = useState<boolean>(false)
  const [imgSuccess, setImgSuccess] = useState<boolean>(false)
  // other
  const { uploadProduct, uploadImg } = useProducts()

  useEffect(() => {
    if (errors) return
    createProduct()
  }, [values, errors])

  useEffect(() => {
    if (productSuccess && imgSuccess) {
      handleClose()
    }
  }, [productSuccess, imgSuccess])

  const createProduct = () => {
    const id = v4()
    const errors: string[] = []
    const { name, description, cost, imgFile } = values
    setCreateProductErrors([])
    setProductSuccess(false)
    setImgSuccess(false)

    setLoading(true)

    uploadProduct(name, description, cost, id)
        .finally(() => {
          setProductSuccess(true)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          error.push('Не удалось загрузить данные!')
          setLoading(false)
        })

    uploadImg(imgFile, id)
        .finally(() => {
          setImgSuccess(true)
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
