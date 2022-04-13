import { Product, ProductFields } from '../../types/products'

export type UploadProduct = (value: ProductFields) => Promise<any>

export interface ProductsContextProps {
  uploadProduct: UploadProduct
  loading: boolean
  products: Product[]
}
