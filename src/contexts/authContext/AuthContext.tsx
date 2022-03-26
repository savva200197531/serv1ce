import React, { useContext } from 'react'
import { TodoContextProps } from './types'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase-config'

const AuthContext = React.createContext<TodoContextProps>({} as TodoContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const signup = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((value) => {
          console.log(value)
        })
  }

  const value = {
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
