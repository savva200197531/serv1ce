import React, { FormEvent, useEffect, useState } from 'react'
import './service.scss'
import FormFieldLayout from '../../components/FormFieldLayout/FormFieldLayout'
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextareaAutosize,
} from '@mui/material'
import Loader from 'react-ts-loaders'
import useValidateStringMinMax from '../../hooks/useValidateStringMinMax'
import useValidateRequired from '../../hooks/useValidateRequired'
import { FormField } from '../../components/FormFieldLayout/types'
import useSubmitServiceForm from '../../hooks/useSubmitServiceForm'
import { PhoneMask } from '../../components/PhoneMask'
import useValidateEmail from '../../hooks/useValidateEmail'
import ServiceInfo from './components/ServiceInfo'
import ServiceDialog from './components/ServiceDialog'
import PersonalDataText from '../../components/PersonalDataText'

const Service = () => {
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [phoneErrors, setPhoneErrors] = useState<string[]>([])
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

  const { submitServiceFormErrors, loading, success } = useSubmitServiceForm(values, hasErrors)
  const { requiredErrors: lastNameErrors } = useValidateRequired(lastName, formSubmit)
  const { lengthErrors: phoneLengthErrors } = useValidateStringMinMax(phone, { min: 17 }, formSubmit)
  const { requiredErrors: nameErrors } = useValidateRequired(name, formSubmit)
  const { emailErrors } = useValidateEmail(email, formSubmit)
  const { requiredErrors: middleNameErrors } = useValidateRequired(middleName, formSubmit)
  const { requiredErrors: addressErrors } = useValidateRequired(address, formSubmit)
  const { requiredErrors: termsErrors } = useValidateRequired(terms, formSubmit)
  const { lengthErrors: descriptionErrors } = useValidateStringMinMax(description, { min: 10 }, formSubmit)
  const { requiredErrors: timeErrors } = useValidateRequired(time, formSubmit)

  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'lastName',
      name: 'Фамилия',
      setState: setLastName,
      errors: [],
    },
    {
      id: 'email',
      name: 'Email',
      setState: setEmail,
      errors: [],
    },
    {
      id: 'name',
      name: 'Имя',
      setState: setName,
      errors: [],
    },
    {
      id: 'skype',
      name: 'Skype',
      setState: setSkype,
      errors: [],
    },
    {
      id: 'middleName',
      name: 'Отчество',
      setState: setMiddleName,
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
      inputComponent: TextareaAutosize,
      setState: setDescription,
      style: {
        gridColumnStart: 1,
        gridColumnEnd: 3,
      },
      errors: [],
    },
    {
      id: 'time',
      name: 'Время по которому с клиентом можно связаться в течение недели',
      setState: setTime,
      style: {
        gridColumnStart: 1,
        gridColumnEnd: 3,
      },
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
    const messages: string[] = [
      ...lastNameErrors,
      ...phoneLengthErrors,
      ...nameErrors,
      ...emailErrors,
      ...middleNameErrors,
      ...addressErrors,
      ...termsErrors,
      ...descriptionErrors,
      ...timeErrors,
    ]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case 'lastName':
          return {
            ...field,
            errors: lastNameErrors,
          }
        case 'email':
          return {
            ...field,
            errors: emailErrors,
          }
        case 'name':
          return {
            ...field,
            errors: nameErrors,
          }
        case 'middleName':
          return {
            ...field,
            errors: middleNameErrors,
          }
        case 'address':
          return {
            ...field,
            errors: addressErrors,
          }
        case 'terms':
          return {
            ...field,
            errors: termsErrors,
          }
        case 'description':
          return {
            ...field,
            errors: descriptionErrors,
          }
        case 'time':
          return {
            ...field,
            errors: timeErrors,
          }
        default:
          return field
      }
    }))

    setPhoneErrors(phoneLengthErrors)

    setFormSubmit(false)
  }, [
    lastNameErrors,
    phoneLengthErrors,
    nameErrors,
    emailErrors,
    middleNameErrors,
    addressErrors,
    termsErrors,
    descriptionErrors,
    timeErrors,
  ])

  useEffect(() => {
    setHasErrors(true)
  }, [loading])

  return (
    <section className="service">
      <div className="container">
        <div className="service-content white-box">
          <ServiceInfo />
          <form className="service-form" onSubmit={handleSubmit}>
            <div className="service-form-fields">
              <FormControl>
                <InputLabel color="primary" htmlFor="phone">Телефон</InputLabel>
                <Input
                  inputComponent={PhoneMask as any}
                  color="primary"
                  id="phone"
                  aria-describedby="phone"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value)
                  }}
                />
                <FormHelperText id="phone" error>
                  {phoneErrors?.map((error: string, index) =>
                    <React.Fragment key={index}>{index !== 0 && ' '}{error}</React.Fragment>,
                  )}
                </FormHelperText>
              </FormControl>

              {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}
            </div>

            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Оформить'}
            </Button>
            <p className="form-submit-errors">{submitServiceFormErrors.map((error) => error)}</p>
            <PersonalDataText text="Оформить заявку" />
          </form>

          <ServiceDialog success={success} />
        </div>
      </div>
    </section>
  )
}

export default Service
