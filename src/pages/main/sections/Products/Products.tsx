import React, { useEffect, useState } from 'react'
import './products.scss'
import Slider from '../../../../components/Slider/Slider'
import Slide from './Slide'
import { useProducts } from '../../../../contexts/productsContext/ProductsContext'
import Loader from 'react-ts-loaders'

// компонент с продуктами сайта
const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { loadProducts, products, loading } = useProducts()

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return (
    <section className="products-section">
      <div className="container">
        <div className="products-content">
          <h2 className="products-title section-title">Наши товары</h2>
          {isLoading ? <Loader type="spinner" size={50} /> : <Slider className="products-slider" Slide={Slide} slides={products} />}
        </div>
      </div>
    </section>
  )
}

export default Products
