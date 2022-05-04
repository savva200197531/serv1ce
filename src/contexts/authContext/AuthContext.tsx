import React, { useContext, useEffect, useState } from 'react'
import { AuthAction, AuthContextProps, ChangePassword, ChangeUserData, GetUser, UpdateProfile } from './types'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  User as FirebaseUser,
} from 'firebase/auth'
import { ref as databaseRef, set, get } from 'firebase/database'
import { auth, db, storage } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types/user'
import { getDownloadURL, uploadBytes, ref as storageRef } from 'firebase/storage'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)
// контекст аунтефикации
export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate()

  // ссылка на базу данных
  const userRef = (id: string) => databaseRef(db, `users/${id}`)
  const imagesRef = (id: string) => storageRef(storage, `avatar/${id}`)

  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState<boolean>(true)

  // забираю пользователя из бд при входе на сайт
  const getUser: GetUser = (payload) => {
    const { uid, email, name, avatar } = payload
    get(userRef(uid)).then(snapshot => {
      if (!snapshot.exists()) {
        console.log('No user data available')
        getUser(payload)
        return
      }
      setIsAuth(true)
      setUser({
        uid,
        email,
        name,
        avatar,
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
          updateUserData(value.user, {
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
          updateUserData(value.user, {
            displayName: name,
          }).then(() => navigate('/'))
        })

  // выход с аккаунта
  const logout = () => signOut(auth).then(() => navigate('/auth/login')).catch((error) => console.log(error))

  const updateUserData: UpdateProfile = (user, { displayName, photoURL }) => {
    return updateProfile(user, {
      displayName,
      photoURL,
    })
  }

  const changeUserData: ChangeUserData = ({ name, imgFile }) => {
    const user = auth.currentUser as FirebaseUser
    if (imgFile) {
      return uploadBytes(imagesRef(user.uid), imgFile)
          .then(() => getDownloadURL(imagesRef(user.uid)))
          .then(url => {
            console.log(url)
            return updateUserData(user, {
              displayName: name,
              photoURL: url,
            })
          })
    }

    return updateUserData(user, {
      displayName: name,
    })
  }

  const changePassword: ChangePassword = (password) => {
    return updatePassword(auth.currentUser as FirebaseUser, password)
  }

  // слежу за состоянием пользователя (вышел/вошел/зарегистрировался)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoading(true)
      if (!currentUser) {
        setIsAuth(false)
        setUser({} as User)
        setLoading(false)
        return
      }

      getUser({
        uid: currentUser.uid,
        email: currentUser.email as string,
        name: currentUser.displayName as string,
        avatar: currentUser.photoURL,
      })
    })
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  // вывожу состояние и функции для использования по всему приложению
  const value = {
    signup,
    login,
    logout,
    user,
    loading,
    changeUserData,
    changePassword,
    isAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
