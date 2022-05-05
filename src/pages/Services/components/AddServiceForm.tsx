import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Button, TextareaAutosize } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-ts-loaders'
import useValidateStringMinMax from '../../../hooks/useValidateStringMinMax'
import useValidateRequired from '../../../hooks/useValidateRequired'
import { NewsFields } from '../../../types/news'
import useCreateNews from '../../../hooks/useCreateNews'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { FormField } from '../../../components/FormFieldLayout/types'
import ImgInput from '../../../components/ImgInput/ImgInput'

type Props = {
  open: boolean
  handleClose: () => void
}

const AddServiceForm: React.FC<Props> = ({ open, handleClose }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imgFile, setImgFile] = useState<File>({} as File)
  const [imgFileErrors, setImgFileErrors] = useState<string[]>([])

  const [values, setValues] = useState({} as NewsFields)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { createNewsErrors, loading } = useCreateNews(values, hasErrors, handleClose)
  const { lengthErrors: titleErrors } = useValidateStringMinMax(title, { min: 3 }, formSubmit)
  const { lengthErrors: descriptionErrors } = useValidateStringMinMax(description, { min: 10, max: 500 }, formSubmit)
  const { requiredErrors: fileErrors } = useValidateRequired(imgFile.name, formSubmit)

  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'title',
      name: 'Заголовок',
      setState: setTitle,
      errors: [],
    },
    {
      id: 'description',
      name: 'Описание',
      setState: setDescription,
      inputComponent: TextareaAutosize,
      errors: [],
    },
  ])

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setValues({
      title,
      description,
      imgFile,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...titleErrors, ...descriptionErrors, ...fileErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case 'title':
          return {
            ...field,
            errors: titleErrors,
          }
        case 'description':
          return {
            ...field,
            errors: descriptionErrors,
          }
        default:
          return field
      }
    }))

    setImgFileErrors(fileErrors)

    setFormSubmit(false)
  }, [titleErrors, descriptionErrors, fileErrors])

  useEffect(() => {
    setTimeout(() => {
      if (open && formRef.current) {
        formRef.current.style.marginTop = `calc(50vh - (${formRef.current.clientHeight}px / 2))`
        formRef.current.style.opacity = '1'
      }
    })
  }, [open, formRef.current, imgFile, description])

  useEffect(() => {
    setIsLoading(loading)
    setHasErrors(true)
  }, [loading])

  return (
    <form ref={formRef} className="edit-news-form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <ImgInput errors={imgFileErrors} setImgFile={setImgFile} />
      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Сохранить'}
      </Button>
      <p className="form-submit-errors">{createNewsErrors.map((error) => error)}</p>
    </form>
  )
}

export default AddServiceForm
