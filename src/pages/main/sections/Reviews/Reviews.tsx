import React from 'react'
import './Reviews.scss'
import avatar from '../../../../assets/images/avatar.svg'
import Slider from '../../../../components/Slider/Slider'
import Slide from './Slide'

const Reviews: React.FC = () => {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews">
          <div className="reviews-description">
            <h2 className="section-title">Отзывы</h2>
            <h3 className="reviews-title">У моего ребёнка сразу появился результат</h3>
            <p className="section-text">
              Хочу поблагодарить нашего тренера Лаптева Сергея Николаевича. Его тренировки построены
              очень профессионально, эффективно и разнообразно.
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
