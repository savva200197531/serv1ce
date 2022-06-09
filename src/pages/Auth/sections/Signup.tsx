import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import useSignup from '../../../hooks/useSignup'
import { Creds } from '../../../types/user'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidatePassword from '../../../hooks/useValidatePassword'
import Loader from 'react-ts-loaders'
import useValidatePasswordConfirm from '../../../hooks/useValidatePasswordConfirm'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { FormField } from '../../../components/FormFieldLayout/types'
import PersonalDataText from '../../../components/PersonalDataText'

const Signup: React.FC = () => {
  // состояние компонента
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'login',
      name: 'Email',
      setState: setLogin,
      errors: [],
    },
    {
      id: 'password',
      name: 'Пароль',
      setState: setPassword,
      errors: [],
    },
    {
      id: 'password-confirm',
      name: 'Подтверждение пароля',
      setState: setPasswordConfirm,
      errors: [],
    },
  ])
  const [creds, setCreds] = useState<Creds>({} as Creds)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { signupErrors, loading } = useSignup(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)
  const { passwordConfirmErrors } = useValidatePasswordConfirm(creds.password, creds.passwordConfirm || '', formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      login,
      password,
      passwordConfirm,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...passwordConfirmErrors, ...emailErrors]

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
        case 'password-confirm':
          return {
            ...field,
            errors: passwordConfirmErrors,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [emailErrors, passwordErrors, passwordConfirmErrors])

  // выставляю загрузку
  useEffect(() => {
    setHasErrors(true)
  }, [loading])

  // верстка
  return <>
    <h2 className="auth-logo">Регистрация</h2>
    <form className="auth-form signup-form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Зарегистрироваться'}
      </Button>
      <p className="form-submit-errors">{signupErrors.map((error) => error)}</p>
      <PersonalDataText text="Зарегистрироваться" />
    </form>
  </>
}

export default Signup
