import React, { useContext, useEffect, useState } from 'react'
import { AuthAction, AuthContextProps, GetUser } from './types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { ref, set, get, child } from 'firebase/database'
import { auth, db } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types/user'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)
// контекст аунтефикации
export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate()

  // ссылка на базу данных
  const userRef = (id: string) => ref(db, `users/${id}`)

  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState<boolean>(true)

  // забираю пользователя из бд при входе на сайт
  const getUser: GetUser = (payload) => {
    const { uid, email, name } = payload
    get(userRef(uid)).then(snapshot => {
      if (!snapshot.exists()) {
        console.log('No user data available')
        getUser(payload)
        return
      }
      setUser({
        uid,
        email,
        name,
        admin: !!snapshot.val().admin,
      })
    }).finally(() => {
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }

  // отправка данных при регистрации
  const signup: AuthAction = ({ login, password, name }) => {
    return createUserWithEmailAndPassword(auth, login, password)
        .then(value => {
          updateProfile(value.user, {
            displayName: name,
          }).catch(error => {
            console.log(error)
          })
          set(userRef(value.user.uid), {
            email: login,
            name,
          }).catch(error => {
            console.log(error)
          })
          navigate('/')
        })
  }

  // отправка данных при входе
  const login: AuthAction = ({ login, password, name }) =>
    signInWithEmailAndPassword(auth, login, password)
        .then(value => {
          updateProfile(value.user, {
            displayName: name,
          }).catch(error => {
            console.log(error)
          })
          navigate('/')
        })

  // выход с аккаунта
  const logout = () => signOut(auth).then(() => navigate('/auth/login')).catch((error) => console.log(error))

  // слежу за состоянием пользователя (вышел/вошел/зарегистрировался)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoading(true)
      if (!currentUser) {
        setUser({} as User)
        setLoading(false)
        return
      }

      getUser({
        uid: currentUser.uid,
        email: currentUser.email as string,
        name: currentUser.displayName as string,
      })
    })
  }, [])

  // вывожу состояние и функции для использования по всему приложению
  const value = {
    signup,
    login,
    logout,
    user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
