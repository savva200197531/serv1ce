import React, { useContext, useEffect, useState } from 'react'
import {
  AuthAction,
  AuthContextProps,
  ChangePassword,
  ChangeUserData,
  GetUser, SetUserToDb,
  UpdateProfile,
} from './types'
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
  const imagesRef = (id = '') => storageRef(storage, `avatar/${id}`)

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
  const signup: AuthAction = ({ login, password }) =>
    createUserWithEmailAndPassword(auth, login, password)
        .then(({ user }) => {
          setUserToDb({
            uid: user.uid,
            email: login,
          })
          navigate('/')
        })

  const setUserToDb: SetUserToDb = (user) => {
    set(userRef(user.uid), user).catch(error => {
      console.log(error)
    })
  }

  // отправка данных при входе
  const login: AuthAction = ({ login, password }) =>
    signInWithEmailAndPassword(auth, login, password)
        .then(() => {
          navigate('/')
        })

  // выход с аккаунта
  const logout = () => signOut(auth).then(() => navigate('/auth/login')).catch((error) => console.log(error))

  const updateUserData: UpdateProfile = (firebaseUser, { displayName, photoURL }) =>
    updateProfile(firebaseUser, {
      displayName,
      photoURL,
    }).finally(() => {
      setUser({
        ...user,
        name: displayName,
        avatar: photoURL || user.avatar,
      })
    })

  const changeUserData: ChangeUserData = ({ name, imgFile }) => {
    const firebaseUser = auth.currentUser as FirebaseUser

    if (imgFile) {
      return uploadBytes(imagesRef(firebaseUser.uid), imgFile)
          .then(() => getDownloadURL(imagesRef(firebaseUser.uid)))
          .then(url => updateUserData(firebaseUser, {
            displayName: name,
            photoURL: url,
          }))
    }

    return updateUserData(firebaseUser, {
      displayName: name,
    })
  }

  const changePassword: ChangePassword = (password) => updatePassword(auth.currentUser as FirebaseUser, password)

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
        avatar: currentUser.photoURL as string,
      })
    })
  }, [])

  useEffect(() => {
    if (Object.values(user).length) {
      setUserToDb(user)
    }
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
