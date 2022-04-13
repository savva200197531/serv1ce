import React from 'react'
import './cart-icon.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CartIcon: React.FC = ({}) => {
  const navigate = useNavigate()

  return (
    <div>
      <Button color="inherit" onClick={() => navigate('/cart')}>
        <FontAwesomeIcon icon={faCartShopping as any} size="2x" />
      </Button>
    </div>
  )
}

export default CartIcon
