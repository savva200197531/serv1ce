import React from 'react'
import './Schedule.scss'
import classNames from 'classnames'
import { Button } from '@mui/material'

type CardInfo = {
  time: string;
  place: string;
  address: string;
};

type Card = {
  className?: string;
  age: {
    from: number;
    to: number;
  };
  left: CardInfo;
  right: CardInfo;
};

const Schedule: React.FC = () => {
  const cards: Card[] = [
    {
      age: {
        from: 4,
        to: 6,
      },
      left: {
        time: 'ПН 19:30',
        place: 'СК «Юпитер»',
        address: 'ул. Смирнова, 75В',
      },
      right: {
        time: 'ПН 19:30',
        place: 'СК «Юпитер»',
        address: 'ул. Смирнова, 75В',
      },
    },
    {
      className: 'cross',
      age: {
        from: 7,
        to: 9,
      },
      left: {
        time: 'СР 19:30',
        place: 'Стадион «Кедр»',
        address: 'ул. В. Высоцкого 7/1',
      },
      right: {
        time: 'ПТ 19:30',
        place: 'СК «Юпитер»',
        address: 'ул. Смирнова, 75В',
      },
    },
    {
      className: 'cross',
      age: {
        from: 10,
        to: 12,
      },
      left: {
        time: 'ПН 19:30',
        place: 'СК «Юпитер»',
        address: 'ул. Смирнова, 75В',
      },
      right: {
        time: 'ЧТ 19:30',
        place: 'СК «Юпитер»',
        address: 'ул. Смирнова, 75В',
      },
    },
    {
      age: {
        from: 13,
        to: 15,
      },
      left: {
        time: 'СР 20:00',
        place: 'Стадион «Кедр»',
        address: 'ул. В. Высоцкого 7/1',
      },
      right: {
        time: 'ЧТ 19:30',
        place: 'Стадион «Кедр»',
        address: 'ул. В. Высоцкого 7/1',
      },
    },
  ]

  return (
    <section className="schedule-section">
      <div className="container">
        <div className="schedule">
          <h2 className="section-title">Расписание</h2>
          <div className="schedule-cards">
            {cards.map((card: Card, index: number) => (
              <div key={index} className={classNames('schedule-card', card.className)}>
                <div className="card-left__top">
                  <h2 className="card-title">
                    {card.age.from}
                    <span className="card-title-separator">-</span>
                    {card.age.to}
                  </h2>
                  <span className="card-title-suffix">лет</span>
                </div>
                <div className="card-right__top">
                  <Button variant="contained" color="error">
                    Записаться
                  </Button>
                </div>
                <div className="card-left__bottom">
                  <h4 className="card-time">{card.left.time}</h4>
                  <p className="card-place">{card.left.place}</p>
                  <p className="card-place">{card.left.address}</p>
                </div>
                <div className="card-right__bottom">
                  <h4 className="card-time">{card.right.time}</h4>
                  <p className="card-place">{card.right.place}</p>
                  <p className="card-place">{card.right.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule
