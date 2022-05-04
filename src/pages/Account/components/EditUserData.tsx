import React, { FormEvent, useEffect, useState } from 'react'
import { FormField } from '../../../components/FormFieldLayout/types'
import useValidateStringMinMax from '../../../hooks/useValidateStringMinMax'
import ImgInput from '../../../components/ImgInput/ImgInput'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { Button } from '@mui/material'
import Loader from 'react-ts-loaders'
import { User, UserData } from '../../../types/user'
import useChangeUserData from '../../../hooks/useChangeUserData'
import { useOutletContext } from 'react-router-dom'

const EditUserData: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>()

  const [name, setName] = useState<string>(user.name)
  const [imgFile, setImgFile] = useState<File>({} as File)
  // const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'name',
      name: 'Имя',
      defaultValue: name,
      setState: setName,
      errors: [],
    },
  ])
  const [data, setData] = useState<UserData>({} as UserData)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { changeUserDataErrors, loading } = useChangeUserData(data, hasErrors)
  const { lengthErrors: nameErrors } = useValidateStringMinMax(data.name, { min: 2, max: 15 }, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setData({
      name,
      imgFile,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...nameErrors]

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
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [nameErrors, changeUserDataErrors])

  return (
    <form className="change-creds-form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <ImgInput label="Выберите фото профиля" setImgFile={setImgFile} />

      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Войти'}
      </Button>
      <p className="form-submit-errors">{changeUserDataErrors.map((error) => error)}</p>
    </form>
  )
}

export default EditUserData
