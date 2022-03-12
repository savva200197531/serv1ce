import React from 'react';
import './Groups.scss'

const Groups = () => {
  return (
    <section className="groups-section">
      <div className="container">
        <div className="groups">
          <div className="groups-description">
            <h2 className="groups-description-title section-title">Наши группы</h2>
            <p className="groups-description-text section-text">
              В нашей школе разработаны групповые программы.
              Вы можете выбрать соответствующую для вашего
              ребёнка группу и записаться на пробное занятие
            </p>
          </div>
          <div className="groups-slider slider">
            слайдер
          </div>
        </div>
      </div>
    </section>
  );
};

export default Groups;
