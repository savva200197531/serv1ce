import { useState, useEffect } from 'react'

type UseValidatePassword = (password: string, formSubmit: boolean) => ({
  passwordErrors: string[]
})

const useValidatePassword: UseValidatePassword = (password, formSubmit) => {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit])

  const setValidationErrors = () => {
    setPasswordErrors([])
    const passwordMessages: string[] = []

    if (!password.length ||
      password.length < 6) {
      if (!password.length) passwordMessages.push('Пароль указан не верно!')
      if (password.length < 6) passwordMessages.push('Минимальная длина пароля 6 символов!')
    }

    setPasswordErrors(passwordMessages)
  }

  return { passwordErrors }
}

export default useValidatePassword
