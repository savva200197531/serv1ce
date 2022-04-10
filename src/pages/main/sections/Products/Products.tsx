import React from 'react'
import './products.scss'
import Slider from '../../../../components/Slider/Slider'
import Slide from './Slide'

const Products: React.FC = () => {
  return (
    <section className="products-section">
      <div className="container">
        <div className="products-content">
          <h2 className="products-title section-title">Наши товары</h2>
          <Slider className="products-slider" url="data/groups-slider.json" Slide={Slide} />
        </div>
      </div>
    </section>
  )
}

export default Products
