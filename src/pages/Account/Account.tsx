import React, { FormEvent, useEffect, useState } from 'react'
import './account.scss'
import FormFieldLayout from '../../components/FormFieldLayout/FormFieldLayout'
import { Button } from '@mui/material'
import Loader from 'react-ts-loaders'
import { FormField } from '../../components/FormFieldLayout/types'
import { Creds } from '../../types/user'
import useValidateEmail from '../../hooks/useValidateEmail'
import useValidatePassword from '../../hooks/useValidatePassword'
import useChangeCreds from '../../hooks/useChangeCreds'
import useValidatePasswordConfirm from '../../hooks/useValidatePasswordConfirm'

const Account: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [oldPassword, setOldPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'login',
      name: 'Email',
      setState: setLogin,
      errors: [],
    },
    {
      id: 'old-password',
      name: 'Старый пароль',
      setState: setOldPassword,
      errors: [],
    },
    {
      id: 'password',
      name: 'Новый пароль',
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
  const { changeCredsErrors, loading } = useChangeCreds(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors: oldPasswordErrors } = useValidatePassword(creds.oldPassword || '', formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)
  const { passwordConfirmErrors } = useValidatePasswordConfirm(creds, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      login,
      oldPassword,
      password,
      passwordConfirm,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...passwordConfirmErrors, ...emailErrors, ...oldPasswordErrors]

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
        case 'old-password':
          return {
            ...field,
            errors: oldPasswordErrors,
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
  }, [emailErrors, oldPasswordErrors, passwordErrors, passwordConfirmErrors, changeCredsErrors])

  // выставляю загрузку
  useEffect(() => {
    setIsLoading(loading)
    setHasErrors(true)
  }, [loading])

  return (
    <section className="account">
      <div className="container">
        <div className="account-content">
          <form className="change-creds-form" onSubmit={handleSubmit}>
            {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Войти'}
            </Button>
            <p className="form-submit-errors">{changeCredsErrors.map((error) => error)}</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Account
