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
import { useAuth } from '../../contexts/authContext/AuthContext'
import useValidateStringMinMax from '../../hooks/useValidateStringMinMax'
import ImgInput from '../../components/ImgInput/ImgInput'

const Account: React.FC = () => {
  const { user } = useAuth()

  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [oldPassword, setOldPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [imgFile, setImgFile] = useState<File>({} as File)
  const [imgFileErrors, setImgFileErrors] = useState<string[]>([])
  // const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'name',
      name: 'Имя пользователя',
      setState: setName,
      errors: [],
    },
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
  const { lengthErrors: nameErrors } = useValidateStringMinMax(creds.name, { min: 2, max: 15 }, formSubmit)
  const { passwordErrors: oldPasswordErrors } = useValidatePassword(creds.oldPassword || '', formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)
  const { passwordConfirmErrors } = useValidatePasswordConfirm(creds, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      name,
      login,
      oldPassword,
      password,
      passwordConfirm,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...passwordConfirmErrors, ...emailErrors, ...oldPasswordErrors, ...nameErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case 'name':
          return {
            ...field,
            errors: nameErrors,
          }
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
  }, [nameErrors, emailErrors, oldPasswordErrors, passwordErrors, passwordConfirmErrors, changeCredsErrors])

  // выставляю загрузку
  useEffect(() => {
    setHasErrors(true)
  }, [loading])

  return (
    <section className="account">
      <div className="container">
        <div className="account-content">
          <form className="change-creds-form" onSubmit={handleSubmit}>
            {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

            <ImgInput label="Выберите фото профиля" errors={imgFileErrors} setImgFile={setImgFile} />

            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Войти'}
            </Button>
            <p className="form-submit-errors">{changeCredsErrors.map((error) => error)}</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Account
