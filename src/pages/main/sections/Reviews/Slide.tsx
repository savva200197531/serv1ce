import React from 'react';
import { SlideProps } from '../../../../components/Slider/Slider';

const Slide: React.FC<SlideProps> = ({
                                       slide,
  className,
                                     }) => {
  return (
    <div className={className}>
      <img className="slide-img" src="" alt="slide img" />
    </div>
  );
};

export default Slide;
