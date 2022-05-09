import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Button, TextareaAutosize } from '@mui/material'
import Loader from 'react-ts-loaders'
import useValidateStringMinMax from '../../../hooks/useValidateStringMinMax'
import FormFieldLayout from '../../../components/FormFieldLayout/FormFieldLayout'
import { FormField } from '../../../components/FormFieldLayout/types'
import ImgInput from '../../../components/ImgInput/ImgInput'
import { CurrencyMask } from '../../../components/СurrencyMask'
import useValidateNumberMinMax from '../../../hooks/useValidateNumberMinMax'
import useMoveModal from '../../../hooks/useMoveModal'
import useCreateService from '../../../hooks/useCreateService'
import { ServiceFields } from '../../../types/service'

type Props = {
  open: boolean
  handleClose: () => void
}

const ServiceForm: React.FC<Props> = ({ open, handleClose }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imgFile, setImgFile] = useState<File>()
  const [cost, setCost] = useState<string>('')

  const [values, setValues] = useState({} as ServiceFields)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  const { createServiceErrors, loading } = useCreateService(values, hasErrors, handleClose)
  const { lengthErrors: titleErrors } = useValidateStringMinMax(title, { min: 3 }, formSubmit)
  const { lengthErrors: descriptionErrors } = useValidateStringMinMax(description, { min: 10, max: 500 }, formSubmit)
  const { numberErrors: costErrors } = useValidateNumberMinMax(Number(cost), { min: 10 }, formSubmit)

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
    {
      id: 'cost',
      name: 'Цена',
      defaultValue: cost,
      setState: setCost,
      inputComponent: CurrencyMask as any,
      errors: [],
    },
  ])

  const formRef = useRef<HTMLFormElement>(null)
  useMoveModal(open, formRef, [imgFile, description])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setValues({
      title,
      description,
      cost,
      imgFile,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...titleErrors, ...descriptionErrors, ...costErrors]

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
        case 'cost':
          return {
            ...field,
            errors: costErrors,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [titleErrors, descriptionErrors, costErrors])

  useEffect(() => {
    setHasErrors(true)
  }, [loading])

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <ImgInput setImgFile={setImgFile} />
      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Сохранить'}
      </Button>
      <p className="form-submit-errors">{createServiceErrors.map((error) => error)}</p>
    </form>
  )
}

export default ServiceForm
