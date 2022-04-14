import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Badge, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/cartContext/CartContext'

const CartButton: React.FC = ({}) => {
  const navigate = useNavigate()

  const { cartProducts } = useCart()

  return (
    <div>
      <Button color="inherit" onClick={() => navigate('/cart')}>
        <Badge badgeContent={cartProducts.length} color="primary">
          <FontAwesomeIcon icon={faCartShopping as any} size="2x" />
        </Badge>
      </Button>
    </div>
  )
}

export default CartButton
