import React from 'react';
import { SlideProps } from '../../../../components/Slider/Slider';

const Slide: React.FC<SlideProps> = ({
                                       slide,
                                     }) => {
  return (
    <div style={{
      backgroundImage: `url('${slide['slide-bg']}')`
    }}>

    </div>
  );
};

export default Slide;
