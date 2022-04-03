import React, { useContext, useEffect, useState } from 'react'
import { AuthAction, AuthContextProps, User } from './types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, set, get, child } from 'firebase/database'
import { auth, db } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate()

  const userRef = (id: string) => ref(db, `users/${id}`)

  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignup, setIsSignup] = useState<boolean>(false)

  const getUser = (uid: string, email: string | null) => {
    get(userRef(uid)).then(snapshot => {
      if (!snapshot.exists()) {
        console.log('No user data available')
        getUser(uid, email)
        return
      }
      setUser({
        uid,
        email,
        admin: !!snapshot.val().admin,
      })
      localStorage.setItem('token', uid)
    }).finally(() => {
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }

  const signup: AuthAction = (email, password) => {
    setIsSignup(true)
    return createUserWithEmailAndPassword(auth, email, password)
        .then(value => {
          set(userRef(value.user.uid), {
            email,
          }).catch(error => {
            console.log(error)
          })
          navigate('/')
        })
  }

  const login: AuthAction = (login, password) =>
    signInWithEmailAndPassword(auth, login, password)
        .then(() => {
          navigate('/')
        })

  const logout = () => signOut(auth).then(() => navigate('/auth/login')).catch((error) => console.log(error))

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoading(true)
      if (!currentUser) {
        localStorage.removeItem('token')
        setLoading(false)
        return
      }

      getUser(currentUser.uid, currentUser.email)
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
