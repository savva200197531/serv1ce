import React from 'react'
import { SlideProps } from '../../../../components/Slider/Slider'
import equipment1 from '../../../../assets/images/equipment_1.jpg'
import equipment2 from '../../../../assets/images/equipment_2.jpg'
import equipment3 from '../../../../assets/images/equipment_3.jpg'

type SlideImg = {
  src: any,
  id: string
}

const Slide: React.FC<SlideProps> = ({ slide, className }) => {
  const slideImages: SlideImg[] = [
    {
      src: equipment1,
      id: '1',
    },
    {
      src: equipment2,
      id: '2',
    },
    {
      src: equipment3,
      id: '3',
    },
  ]

  const src: string | undefined = slideImages.find(item => item.id === slide.id)?.src

  return (
    <div className={className}>
      <img className="slide-img" src={src} alt="slide img" />
    </div>
  )
}

export default Slide
