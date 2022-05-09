import React, { FormEvent, useEffect, useRef, useState } from 'react'
import './service-form.scss'
import FormFieldLayout from '../../components/FormFieldLayout/FormFieldLayout'
import ImgInput from '../../components/ImgInput/ImgInput'
import { Button, TextareaAutosize } from '@mui/material'
import Loader from 'react-ts-loaders'
import { NewsFields } from '../../types/news'
import useCreateNews from '../../hooks/useCreateNews'
import useValidateStringMinMax from '../../hooks/useValidateStringMinMax'
import useValidateRequired from '../../hooks/useValidateRequired'
import { FormField } from '../../components/FormFieldLayout/types'
import useMoveModal from '../../hooks/useMoveModal'
import useSubmitServiceForm from '../../hooks/useSubmitServiceForm'
import { PhoneMask } from '../../components/PhoneMask'

const ServiceForm = () => {
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [middleName, setMiddleName] = useState<string>('')
  const [skype, setSkype] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [terms, setTerms] = useState<string>('')
  const [material, setMaterial] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [time, setTime] = useState<string>('')

  const [values, setValues] = useState({} as any)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  const { submitServiceFormErrors, loading } = useSubmitServiceForm(values, hasErrors)
  const { requiredErrors } = useValidateRequired()
  const { requiredErrors } = useValidateRequired()
  const { requiredErrors } = useValidateRequired()

  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'lastName',
      name: 'Фамилия',
      setState: setLastName,
      errors: [],
    },
    {
      id: 'phone',
      name: 'Телефон',
      inputComponent: PhoneMask as any,
      setState: setPhone,
      errors: [],
    },
    {
      id: 'name',
      name: 'Имя',
      setState: setName,
      errors: [],
    },
    {
      id: 'email',
      name: 'email',
      setState: setEmail,
      errors: [],
    },
    {
      id: 'middleName',
      name: 'Отчество',
      setState: setMiddleName,
      errors: [],
    },
    {
      id: 'skype',
      name: 'Skype',
      setState: setSkype,
      errors: [],
    },
    {
      id: 'address',
      name: 'Адрес предоставления услуг',
      setState: setAddress,
      errors: [],
    },
    {
      id: 'terms',
      name: 'Сроки окончания работ',
      setState: setTerms,
      errors: [],
    },
    {
      id: 'material',
      name: 'Материал который присутствует',
      setState: setMaterial,
      errors: [],
    },
    {
      id: 'description',
      name: 'Описание услуг',
      setState: setDescription,
      errors: [],
    },
    {
      id: 'time',
      name: 'Время по которому с клиентом можно связаться в течение недели',
      setState: setTime,
      errors: [],
    },
  ])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setValues({
      lastName,
      phone,
      name,
      email,
      middleName,
      skype,
      address,
      terms,
      material,
      description,
      time,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = []

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        case '':
          return {
            ...field,
            errors: ,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [])

  useEffect(() => {
    setHasErrors(true)
  }, [loading])

  return (
    <section className="service-form">
      <div className="container">
        <div className="service-form-content">
          <form className="" onSubmit={handleSubmit}>
            {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Сохранить'}
            </Button>
            <p className="form-submit-errors">{submitServiceFormErrors.map((error) => error)}</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ServiceForm
