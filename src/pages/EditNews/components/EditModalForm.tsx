import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Button, FormControl, FormHelperText, Input, InputLabel, TextareaAutosize } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-ts-loaders'
import { FormField } from '../../../types/form'
import { NumberFormatCustom } from './NumberFormatCustom'
import { ProductFields } from '../../../types/products'
import useCreateProduct from '../../../hooks/useCreateProduct'
import useValidateStringMinMax from '../../../hooks/useValidateStringMinMax'
import useValidateNumberMinMax from '../../../hooks/useValidateNumberMinMax'
import useValidateRequired from '../../../hooks/useValidateRequired'

type Props = {
  open: boolean
  handleClose: () => void
}

const EditModalForm: React.FC<Props> = ({ open, handleClose }) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [cost, setCost] = useState<string>('')
  const [imgFile, setImgFile] = useState<File>({} as File)
  const [imgFileErrors, setImgFileErrors] = useState<string[]>([])

  const [values, setValues] = useState({} as ProductFields)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { createProductErrors, loading } = useCreateProduct(values, hasErrors, handleClose)
  const { lengthErrors: nameErrors } = useValidateStringMinMax(name, { min: 3 }, formSubmit)
  const { lengthErrors: descriptionErrors } = useValidateStringMinMax(description, { min: 10, max: 100 }, formSubmit)
  const { numberErrors: costErrors } = useValidateNumberMinMax(Number(cost), { min: 10 }, formSubmit)
  const { requiredErrors: fileErrors } = useValidateRequired(imgFile.name, formSubmit)

  const [img, setImg] = useState<string | null>()

  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'name',
      name: 'Название',
      setState: setName,
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
      setState: setCost,
      inputComponent: NumberFormatCustom as any,
      errors: [],
    },
  ])

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setValues({
      name,
      description,
      cost,
      imgFile,
    })
    setFormSubmit(true)
  }

  const handleCapture = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return

    const file = target.files[0]
    setImgFile(file)

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = ({ target }: ProgressEvent<FileReader>) => {
      setImg(target?.result as string || null)
    }
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...nameErrors, ...descriptionErrors, ...costErrors, ...fileErrors]

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

    setImgFileErrors(fileErrors)

    setFormSubmit(false)
  }, [nameErrors, descriptionErrors, costErrors, fileErrors])

  useEffect(() => {
    setTimeout(() => {
      if (open && formRef.current) {
        formRef.current.style.marginTop = `calc(50vh - (${formRef.current.clientHeight}px / 2))`
        formRef.current.style.opacity = '1'
      }
    })
  }, [open, formRef.current, img, description])

  useEffect(() => {
    setIsLoading(loading)
    setHasErrors(true)
  }, [loading])

  return (
    <form ref={formRef} className="edit-products-form" onSubmit={handleSubmit}>
      {fields.map(field => (
        <FormControl key={field.id}>
          <InputLabel color="primary" htmlFor={field.id}>
            {field.name}
          </InputLabel>
          <Input
            color="primary"
            id={field.id}
            defaultValue={field.defaultValue}
            aria-describedby={field.id}
            onChange={(event) => field.setState(event.target.value)}
            inputComponent={field.inputComponent || undefined}
          />
          <FormHelperText
            id={field.id}
            error
          >
            {field.errors.map((error: string, index: number) =>
              <React.Fragment key={index}>{index !== 0 && ' '}{error}</React.Fragment>,
            )}
          </FormHelperText>
        </FormControl>
      ))}
      <input
        accept="image/*"
        id="icon-button-photo"
        onChange={handleCapture}
        type="file"
        style={{
          display: 'none',
        }}
      />
      <div>
        <label className="edit-products-img-label" htmlFor="icon-button-photo">
          <Button color="primary" component="span">
            <FontAwesomeIcon icon={faCamera as any} size="2x"/>
            <span className="edit-products-img-label__text">Выберите изображение</span>
          </Button>
        </label>
        <p className="edit-products-form-errors">{imgFileErrors.map((error) => error)}</p>
      </div>
      {img && <img className="edit-products-img-preview" src={img} alt="img"/>}
      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader className="auth-spinner" type="dualring" size={20} /> : 'Сохранить'}
      </Button>
      <p className="form-submit-errors">{createProductErrors.map((error) => error)}</p>
    </form>
  )
}

export default EditModalForm