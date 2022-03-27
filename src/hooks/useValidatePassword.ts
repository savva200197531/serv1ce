import { useState, useEffect } from 'react'
import { Creds } from '../types/user'

type UseValidatePassword = (creds: Creds, formSubmit: boolean) => ({
  passwordErrors: string[]
  passwordConfirmErrors: string[]
})

const useValidatePassword: UseValidatePassword = ({ password, passwordConfirm }, formSubmit) => {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [passwordConfirmErrors, setPasswordConfirmErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit])

  const setValidationErrors = () => {
    setPasswordConfirmErrors([])
    setPasswordErrors([])
    const passwordMessages: string[] = []
    const passwordConfirmMessages: string[] = []

    if (!password.length ||
      password.length < 6) {
      if (!password.length) passwordMessages.push('Пароль указан не верно!')
      if (password.length < 6) passwordMessages.push('Минимальная длина пароля 6 символов!')
    }

    if (password !== passwordConfirm) passwordConfirmMessages.push('Пароли не совпадают!')

    setPasswordConfirmErrors(passwordConfirmMessages)
    setPasswordErrors(passwordMessages)
  }

  return { passwordErrors, passwordConfirmErrors }
}

export default useValidatePassword
