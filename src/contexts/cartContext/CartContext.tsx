import React, { useContext } from 'react'
import { CartContextProps } from './types'
import { db } from '../../firebase-config'
import { ref, onValue, set, push } from 'firebase/database'
import { useAuth } from '../authContext/AuthContext'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

export const CartProvider: React.FC = ({ children }) => {
  const { user } = useAuth()

  const cartRef = () => ref(db, `cart/${user.uid}`)

  const addProduct = (payload: any) => {
    set(push(cartRef()), payload).catch(error => {
      console.log(error)
    })
  }

  const value = {
    addProduct,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
