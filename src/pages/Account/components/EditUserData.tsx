import React, { FormEvent, useEffect, useState } from 'react'
import { FormField } from '../../../components/FormFieldLayout/types'
import useChangeCreds from '../../../hooks/useChangeCreds'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidateStringMinMax from '../../../hooks/useValidateStringMinMax'
import ImgInput from '../../../components/ImgInput/ImgInput'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { Button } from '@mui/material'
import Loader from 'react-ts-loaders'

const EditUserData: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
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
  ])
  const [creds, setCreds] = useState<any>({} as any)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { changeCredsErrors, loading } = useChangeCreds(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { lengthErrors: nameErrors } = useValidateStringMinMax(creds.name, { min: 2, max: 15 }, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      name,
      login,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...emailErrors, ...nameErrors]

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
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [nameErrors, emailErrors, changeCredsErrors])

  return (
    <form className="change-creds-form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <ImgInput label="Выберите фото профиля" errors={imgFileErrors} setImgFile={setImgFile} />

      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Войти'}
      </Button>
      <p className="form-submit-errors">{changeCredsErrors.map((error) => error)}</p>
    </form>
  )
}

export default EditUserData
