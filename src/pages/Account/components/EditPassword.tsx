import React, { FormEvent, useEffect, useState } from 'react'
import { FormField } from '../../../components/FormFieldLayout/types'
import useChangeCreds from '../../../hooks/useChangeCreds'
import useValidatePassword from '../../../hooks/useValidatePassword'
import useValidatePasswordConfirm from '../../../hooks/useValidatePasswordConfirm'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { Button } from '@mui/material'
import Loader from 'react-ts-loaders'

const EditPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [fields, setFields] = useState<FormField[]>([
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
  const [creds, setCreds] = useState<any>({} as any)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { changeCredsErrors, loading } = useChangeCreds(creds, hasErrors)
  const { passwordErrors: oldPasswordErrors } = useValidatePassword(creds.oldPassword || '', formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)
  const { passwordConfirmErrors } = useValidatePasswordConfirm(creds, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      oldPassword,
      password,
      passwordConfirm,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...oldPasswordErrors, ...passwordErrors, ...passwordConfirmErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
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
  }, [oldPasswordErrors, passwordErrors, passwordConfirmErrors, changeCredsErrors])

  return (
    <form className="change-creds-form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Войти'}
      </Button>
      <p className="form-submit-errors">{changeCredsErrors.map((error) => error)}</p>
    </form>
  )
}

export default EditPassword
