import React from 'react'
import './Reviews.scss'
import avatar from '../../../../assets/images/avatar.svg'
import Slider from '../../../../components/Slider/Slider'
import Slide from './Slide'

// отзывы
const Reviews: React.FC = () => {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews">
          <div className="reviews-description">
            <h2 className="section-title">Отзывы</h2>
            <h3 className="reviews-title">Отличное оборудование</h3>
            <p className="section-text">
              Хочу выразить благодарность вашей компании. Оборудование работает без перебоев.
            </p>
            <div className="account">
              <img className="account-avatar" src={avatar} alt="avatar" />
              <div className="account-description">
                <h5 className="account-name">Григорий Сергеев</h5>
                <div className="account-socials">
                  <a href="#" className="account-social">
                    Facebook
                  </a>
                  <a href="#" className="account-social">
                    Вконтакте
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Slider
            className="videos-slider"
            Slide={Slide}
            navigation
            url="data/videos-slider.json"
          />
        </div>
      </div>
    </section>
  )
}

export default Reviews
