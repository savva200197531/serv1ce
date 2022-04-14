import { useState, useEffect } from 'react'
import { Creds } from '../types/user'
import { useAuth } from '../contexts/authContext/AuthContext'

type UseLogin = (creds: Creds, errors: boolean) => ({
  loginErrors: string[]
  loading: boolean
})

// отпрвляю данные в контекст и если есть ошибка, выставляю ее
const useLogin: UseLogin = (creds, errors) => {
  // state
  const [loginErrors, setLoginErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { login } = useAuth()

  useEffect(() => {
    if (errors) return
    setLoginErrors([])
    setLoading(true)
    login(creds.login, creds.password)
        .finally(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoginErrors(['Не удалось войти в аккаунт!'])
        })
  }, [creds, errors])

  return { loginErrors, loading }
}

export default useLogin
