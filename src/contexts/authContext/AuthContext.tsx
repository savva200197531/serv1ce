import React, { useContext } from 'react'
import { TodoContextProps } from './types'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext<TodoContextProps>({} as TodoContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate()

  const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)
        .then((value) => {
          console.log(value)
          navigate('/')
        })

  const value = {
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
