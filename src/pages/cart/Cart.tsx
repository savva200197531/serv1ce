import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/cartContext/CartContext'
import Loader from 'react-ts-loaders'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Cart: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { loading, cartProducts, incrementProduct, decrementProduct, deleteProduct } = useCart()

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return (
    <div>
      {isLoading ? <Loader type="spinner" size={50} /> : cartProducts.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <Button variant="outlined" color="primary" onClick={() => decrementProduct(product)}>
            -
          </Button>
          <Button variant="outlined" color="primary" onClick={() => incrementProduct(product)}>
            +
          </Button>
          <Button variant="outlined" color="error" onClick={() => deleteProduct(product)}>
            <FontAwesomeIcon icon={faTrashCan as any} size="lg" />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Cart
