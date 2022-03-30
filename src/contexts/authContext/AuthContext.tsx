import React, { useContext, useEffect, useState } from 'react'
import { AuthAction, TodoContextProps, User } from './types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext<TodoContextProps>({} as TodoContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState<boolean>(true)

  const signup: AuthAction = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
        .then((value) => {
          navigate('/')
        })

  const login: AuthAction = (login, password) =>
    signInWithEmailAndPassword(auth, login, password)
        .then(() => {
          navigate('/')
        })

  const logout = () => signOut(auth).then(() => navigate('/auth/login')).catch((error) => console.log(error))

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        localStorage.removeItem('token')
        return
      }
      setUser({
        email: currentUser.email,
        uid: currentUser.uid,
      })
      localStorage.setItem('token', currentUser.uid)
      setLoading(false)
    })
  }, [])

  const value = {
    signup,
    login,
    logout,
    user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
