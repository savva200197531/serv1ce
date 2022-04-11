import React from 'react'
import './info.scss'
import classNames from 'classnames'

type Card = {
  className?: string;
  title: string
  text?: string
  onClick?: () => void
};

const Info: React.FC = () => {
  const cards: Card[] = [
    {
      title: 'А вы доверяете своей сети',
      text: 'Можете ли Вы с полной уверенностью сказать, что доверяете своей сети?',
    },
    {
      title: 'Обслуживание и поддержка',
      text: 'В этом разделе сайта вы найдете необходимую документацию и руководства.',
      className: 'cross',
    },
    {
      title: 'Купить оборудование',
      className: 'cross',
      onClick: () => {
        const scrollTo = document.querySelector('.products-section')
        scrollTo?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      title: 'Взять на тест',
      text: 'В разработке',
    },
  ]

  return (
    <section className="info-section">
      <div className="container">
        <div className="info">
          <h2 className="section-title">Разрабатываем и производим сетевые решения с уникальным уровнем доверия</h2>
          <div className="info-cards">
            {cards.map((card: Card, index: number) => (
              <div onClick={card.onClick} key={index} className={classNames('info-card', card.className)}>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info
