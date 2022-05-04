import { useState, useEffect } from 'react'
import { Creds } from '../types/user'

type UseValidatePassword = (password: string, passwordConfirm: string, formSubmit: boolean) => ({
  passwordConfirmErrors: string[]
})

// валидация подтверждения пароля
const useValidatePasswordConfirm: UseValidatePassword = (password, passwordConfirm, formSubmit) => {
  const [passwordConfirmErrors, setPasswordConfirmErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit])

  const setValidationErrors = () => {
    setPasswordConfirmErrors([])

    const passwordConfirmMessages: string[] = []

    if (password !== passwordConfirm) passwordConfirmMessages.push('Пароли не совпадают!')

    setPasswordConfirmErrors(passwordConfirmMessages)
  }

  return { passwordConfirmErrors }
}

export default useValidatePasswordConfirm
