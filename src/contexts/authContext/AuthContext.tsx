import React, { useContext } from 'react'
import { AuthAction, TodoContextProps } from './types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext<TodoContextProps>({} as TodoContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate()

  const signup: AuthAction = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
        .then((value) => {
          console.log(value)
          navigate('/')
        })

  const login: AuthAction = (login, password) =>
    signInWithEmailAndPassword(auth, login, password)
        .then(() => {
          navigate('/')
        })

  const logout = () => signOut(auth).then(() => navigate('/auth/login')).catch((error) => console.log(error))

  const value = {
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
