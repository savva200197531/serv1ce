import React, { useContext, useEffect, useState } from 'react'
import { AddProduct, CartContextProps, ChangeProduct } from './types'
import { db } from '../../firebase-config'
import { ref, onValue, set, update, remove } from 'firebase/database'
import { useAuth } from '../authContext/AuthContext'
import { CartProduct } from '../../types/cart'
import { Product } from '../../types/products'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

export const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { user } = useAuth()

  const cartRef = (id = '') => ref(db, `cart/${user.uid}/${id}`)

  const addProduct: AddProduct = (product: Product) => {
    const overlap = cartProducts.find((item: CartProduct) => item.id === product.id)
    if (overlap) {
      incrementProduct(overlap)
    } else {
      set(cartRef(product.id), {
        ...product,
        quantity: 1,
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const incrementProduct: ChangeProduct = (product: CartProduct) => {
    update(cartRef(product.id), {
      quantity: product.quantity + 1,
    }).catch(error => {
      console.log(error)
    })
  }

  const decrementProduct: ChangeProduct = (product: CartProduct) => {
    if (product.quantity - 1 === 0) {
      deleteProduct(product)
    }
    update(cartRef(product.id), {
      quantity: product.quantity - 1,
    }).catch(error => {
      console.log(error)
    })
  }

  const deleteProduct: ChangeProduct = (product: CartProduct) => {
    remove(cartRef(product.id)).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    setLoading(true)

    onValue(cartRef(), (snapshot) => {
      if (!snapshot.exists()) {
        return setLoading(false)
      }
      const value = snapshot.val()
      setCartProducts(Object.keys(value).map(key => value[key]))
      setLoading(false)
    })
  }, [])

  const value = {
    cartProducts,
    addProduct,
    incrementProduct,
    decrementProduct,
    deleteProduct,
    loading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
