import { useState, useEffect } from 'react'
import { Creds } from '../types/user'

type UseValidatePassword = (creds: Creds, formSubmit: boolean) => ({
  passwordConfirmErrors: string[]
})

const useValidatePassword: UseValidatePassword = ({ password, passwordConfirm }, formSubmit) => {
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

export default useValidatePassword
