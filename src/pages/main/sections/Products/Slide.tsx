import React from 'react'
import { SlideProps } from '../../../../components/Slider/Slider'
import { Button } from '@mui/material'
import { useCart } from '../../../../contexts/cartContext/CartContext'
import { Product } from '../../../../types/products'

interface Props extends SlideProps {
  slide: Product
}

// отдельный продукт (слайд)
const Slide: React.FC<Props> = ({ slide, className, setCounter, index, counter }) => {
  const { addProduct } = useCart()

  return (
    <div className={className} onClick={() => setCounter(index)}>
      <h5 className="slide-title">{slide.name}</h5>
      <p className="">{slide.cost}</p>
      <ul className="slide-description">{slide.description}</ul>
      {index === counter && (
        <Button onClick={() => addProduct(slide)} variant="outlined" color="inherit">
          Купить
        </Button>
      )}
    </div>
  )
}

export default Slide
