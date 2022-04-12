import React, { useEffect, useState } from 'react'
import './edit-products.scss'
import EditProductModal from './EditProductModal'
import { useProducts } from '../../../contexts/productsContext/ProductsContext'
import Loader from 'react-ts-loaders'

const EditProducts: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { loadProducts, products, loading } = useProducts()

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return (
    <section className="edit-products">
      <div className="container">
        <div className="edit-products-content">
          <EditProductModal />
          {isLoading ? <Loader type="spinner" size={50} /> : products.map(product => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EditProducts
