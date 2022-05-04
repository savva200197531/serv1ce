import { useState, useEffect } from 'react'
import { Creds, UserData } from '../types/user'
import { useAuth } from '../contexts/authContext/AuthContext'
import { auth } from '../firebase-config'

type UseChangeUserData = (data: UserData, errors: boolean) => ({
  changeUserDataErrors: string[]
  loading: boolean
})

// отпрвляю данные в контекст и если есть ошибка, выставляю ее
const useChangeUserData: UseChangeUserData = (data, errors) => {
  // state
  const [changeUserDataErrors, setChangeUserDataErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { changeUserData } = useAuth()

  useEffect(() => {
    if (errors) return
    setChangeUserDataErrors([])
    setLoading(true)
    changeUserData(data)
        .finally(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setChangeUserDataErrors(['Не удалось войти в аккаунт!'])
        })
  }, [data, errors])

  return { changeUserDataErrors, loading }
}

export default useChangeUserData
