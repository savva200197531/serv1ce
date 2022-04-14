import { Product, ProductFields } from '../../types/products'

export type UploadProduct = (value: ProductFields) => Promise<any>

export type DeleteProduct = (value: Product) => void

export interface ProductsContextProps {
  uploadProduct: UploadProduct
  loading: boolean
  products: Product[]
  deleteProduct: DeleteProduct
}
