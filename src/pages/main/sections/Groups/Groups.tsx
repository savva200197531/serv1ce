import React from 'react'
import './Groups.scss'
import Slider from '../../../../components/Slider/Slider'
import Slide from './Slide'

const Groups: React.FC = () => {
  return (
    <section className="products-section">
      <div className="container">
        <div className="products">
          <div className="products-description">
            <h2 className="products-description-title section-title">Наши товары</h2>
            {/*<p className="products-description-text section-text">*/}
            {/*  В нашей школе разработаны групповые программы. Вы можете выбрать соответствующую для*/}
            {/*  вашего ребёнка группу и записаться на пробное занятие*/}
            {/*</p>*/}
          </div>
          <Slider className="products-slider" url="data/groups-slider.json" Slide={Slide} />
        </div>
      </div>
    </section>
  )
}

export default Groups
