import { useState, useEffect } from 'react'
import { Creds, PasswordData } from '../types/user'
import { useAuth } from '../contexts/authContext/AuthContext'

type UseChangePassword = (data: PasswordData, errors: boolean) => ({
  changePasswordErrors: string[]
  loading: boolean
})

// отпрвляю данные в контекст и если есть ошибка, выставляю ее
const useChangePassword: UseChangePassword = (data, errors) => {
  // state
  const [changePasswordErrors, setChangePasswordErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  // const { login } = useAuth()

  useEffect(() => {
    if (errors) return
    setChangePasswordErrors([])
    // setLoading(true)
    // login(creds.login, creds.password)
    //     .finally(() => {
    //       setLoading(false)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       setChangePasswordErrors(['Не удалось войти в аккаунт!'])
    //     })
  }, [data, errors])

  return { changePasswordErrors, loading }
}

export default useChangePassword
