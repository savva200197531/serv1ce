import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/cartContext/CartContext'
import Loader from 'react-ts-loaders'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './cart.scss'

const Cart: React.FC = () => {
  const { loading, cartProducts, incrementProduct, decrementProduct, deleteProduct } = useCart()

  return (
    <section className="cart-section">
      <div className="container">
        <div className="cart">
          {loading ? <Loader type="spinner" size={50} /> :
            !cartProducts.length ? <div>Корзина пуста</div> :
              cartProducts.map(product => (
                <div className="cart-item" key={product.id}>
                  <div className="img-wrapper">
                    <div>
                      <img src={product.url} alt={product.name} />
                    </div>
                  </div>
                  <p>{product.name}</p>
                  <div className="cart-item-count">
                    <Button variant="outlined" color="primary" onClick={() => decrementProduct(product)}>
                      -
                    </Button>
                    <span>{product.quantity}</span>
                    <Button variant="outlined" color="primary" onClick={() => incrementProduct(product)}>
                      +
                    </Button>
                  </div>
                  <Button variant="outlined" color="error" onClick={() => deleteProduct(product)}>
                    <FontAwesomeIcon icon={faTrashCan as any} size="lg" />
                  </Button>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Cart
