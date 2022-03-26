import { useState, useEffect } from 'react'
import { Creds } from '../types/user'

const useValidatePassword = (creds: Creds, formSubmit: boolean) => {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit, creds])

  const setValidationErrors = () => {
    setPasswordErrors([])
    const messages = []
    if (!creds.password.length ||
      creds.password.length < 6) {
      if (!creds.password.length) messages.push('Пароль указан не верно!')
      if (creds.password.length < 6) messages.push('Минимальная длина пароля 6 символов!')
    }
    if (creds.passwordConfirm) {
      if (creds.password !== creds.passwordConfirm) messages.push('Пароли не совпадают!')
    }
    return setPasswordErrors(messages)
  }

  return { passwordErrors }
}

export default useValidatePassword
