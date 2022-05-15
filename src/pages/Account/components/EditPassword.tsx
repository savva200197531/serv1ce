import React, { FormEvent, useEffect, useState } from 'react'
import { FormField } from '../../../components/FormFieldLayout/types'
import useValidatePassword from '../../../hooks/useValidatePassword'
import useValidatePasswordConfirm from '../../../hooks/useValidatePasswordConfirm'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { Button } from '@mui/material'
import Loader from 'react-ts-loaders'
import { PasswordData } from '../../../types/user'
import useChangePassword from '../../../hooks/useChangePassword'

const EditPassword: React.FC = () => {
  // const [oldPassword, setOldPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [fields, setFields] = useState<FormField[]>([
    // {
    //   id: 'old-password',
    //   name: 'Старый пароль',
    //   setState: setOldPassword,
    //   errors: [],
    // },
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
  const [data, setData] = useState<PasswordData>({} as PasswordData)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { changePasswordErrors, loading } = useChangePassword(data, hasErrors)
  // const { passwordErrors: oldPasswordErrors } = useValidatePassword(data.oldPassword || '', formSubmit)
  // const { passwordConfirmErrors: oldPasswordConfirmErrors } = useValidatePasswordConfirm(data.oldPassword, user., formSubmit)
  const { passwordErrors } = useValidatePassword(data.password, formSubmit)
  const { passwordConfirmErrors } = useValidatePasswordConfirm(data.password, data.passwordConfirm, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setData({
      // oldPassword,
      password,
      passwordConfirm,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...passwordConfirmErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        // case 'old-password':
        //   return {
        //     ...field,
        //     errors: oldPasswordErrors,
        //   }
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
  }, [passwordErrors, passwordConfirmErrors])

  return (
    <form className="change-creds-form account-content__item" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Сохранить'}
      </Button>
      <p className="form-submit-errors">{changePasswordErrors.map((error, index) => <p key={index}>error</p>)}</p>
    </form>
  )
}

export default EditPassword
