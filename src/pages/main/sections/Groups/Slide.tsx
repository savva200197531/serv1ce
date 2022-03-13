import React from 'react';
import { SlideProps } from '../../../../components/Slider/Slider';

const Slide: React.FC<SlideProps> = ({
                                       slide,
  className,
  setCounter,
  index,
                                     }) => {
  return (
    <div className={className} onClick={() => setCounter(index)}>
      <h5 className="slide-title">{slide.slideTitle}</h5>
      <div className="age">
        <h2 className="slide-age-start card-title">{slide.slideAgeStart}</h2>
        <span className="card-title-separator">-</span>
        <h2 className="slide-age-end card-title">{slide.slideAgeEnd}</h2>
        <span className="card-title-suffix">лет</span>
      </div>
      <ul className="slide-description">
        {slide.slideDescription.map((item: string) => (
          <li className="slide-description-item">{item}</li>
        ))}
      </ul>
      <button className="white-btn">Записаться</button>
    </div>
  );
};

export default Slide;
