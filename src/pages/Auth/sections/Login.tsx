import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Creds } from '../../../types/user'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidatePassword from '../../../hooks/useValidatePassword'
import Loader from 'react-ts-loaders'
import useLogin from '../../../hooks/useLogin'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { FormField } from '../../../components/FormFieldLayout/types'
import useValidateStringMinMax from '../../../hooks/useValidateStringMinMax'

const Login: React.FC = () => {
  // состояние компонента
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'login',
      name: 'Email',
      setState: setLogin,
      defaultValue: login,
      errors: [],
    },
    {
      id: 'password',
      name: 'Пароль',
      setState: setPassword,
      defaultValue: password,
      errors: [],
    },
  ])
  const [creds, setCreds] = useState<Creds>({} as Creds)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { loginErrors, loading } = useLogin(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      login,
      password,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...emailErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case 'login':
          return {
            ...field,
            errors: emailErrors,
          }
        case 'password':
          return {
            ...field,
            errors: passwordErrors,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [emailErrors, passwordErrors])

  useEffect(() => {
    setHasErrors(true)
  }, [loading])

  // верстка
  return <>
    <h2 className="auth-logo">Вход</h2>
    <form className="auth-form login-form locomotive-list" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Войти'}
      </Button>
      <p className="form-submit-errors">{loginErrors.map((error) => error)}</p>
    </form>
  </>
}

export default Login
