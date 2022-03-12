import React, { ReactElement, useEffect, useState } from 'react';
import './Slider.scss'
import axios from 'axios';
import classNames from 'classnames';
import arrowLeft from '../../assets/images/arrow-left.svg'
import arrowRight from '../../assets/images/arrow-right.svg'

export type SlideProps = {
  slide: any
}

type Props = {
  url: string
  navigation?: boolean
  className?: string
  Slide: React.FC<SlideProps>
}

const Slider: React.FC<Props> = ({
                                   url,
                                   navigation,
                                   className,
                                   Slide
                                 }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [slides, setSlides] = useState<any[]>([]);

  const getSlides = () => {
    setIsLoading(true)
    axios.get(url).then(res => {
      if (!res) return
      setSlides(res.data)
      // drawSlider();
    }).finally(() => {
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
    });
  };

  const nextSlide = () => {
    setCounter(counter + 1)
    if (counter >= slides.length - 1) {
      setCounter(0)
    }
  }

  const prevSlide = () => {
    setCounter(counter - 1)
    if (counter <= 0) {
      setCounter(slides.length - 1)
    }
  }

  useEffect(() => {
    getSlides()
  }, [])

  useEffect(() => {
    console.log(counter)
  }, [counter])

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <div className={classNames("slider", className)}>
      <div className="slider-controls">
        <img onClick={prevSlide} src={arrowLeft} alt="prev slide" className="prev-slide"/>
        <ul className="dots">
          {navigation && slides.map((slide, index: number) => (
            <li key={index} className={classNames('dot', { 'active': index === counter })}
                onClick={() => setCounter(index)}/>
          ))}
        </ul>
        <img onClick={nextSlide} src={arrowRight} alt="next slide" className="next-slide"/>
      </div>
      <div className="slides-container">
        {slides.map((slide, index: number) => (
          <div
            className={
              classNames(
                'slide',
                { 'active': index === counter },
                { 'prev': index === counter - 1 },
                { 'next': index === counter + 1 }
              )
            }
            key={index}
            onClick={() => setCounter(index)}
          >
            <Slide slide={slide}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
