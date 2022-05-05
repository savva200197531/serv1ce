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
  const { changePassword } = useAuth()

  useEffect(() => {
    if (errors) return
    setChangePasswordErrors([])
    setLoading(true)
    const messages: string[] = []
    changePassword(data.password)
        .finally(() => {
          setLoading(false)
        })
        .catch((error) => {
          if (error.message.includes('auth/requires-recent-login')) {
            messages.push('Вы авторизированы слишком долго!')
          }
          messages.push('Не удалось сменить пароль!')
          setChangePasswordErrors(messages)
        })
  }, [data, errors])

  return { changePasswordErrors, loading }
}

export default useChangePassword
