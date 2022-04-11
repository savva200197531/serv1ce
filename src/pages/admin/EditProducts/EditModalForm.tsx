import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-ts-loaders'
import { FormField } from '../../../types/form'
import { NumberFormatCustom } from './NumberFormatCustom'
import { ProductFields } from '../../../types/products'
import useCreateProduct from '../../../hooks/useCreateProduct'

type Props = {
  open: boolean
  handleClose: (value: boolean) => void
}

const EditModalForm: React.FC<Props> = ({ open, handleClose }) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [cost, setCost] = useState<string>('')
  const [imgFile, setImgFile] = useState<File>({} as File)

  const [values, setValues] = useState({} as ProductFields)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { createProductErrors, loading } = useCreateProduct(values, hasErrors)

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
    setHasErrors(false)
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

  useEffect(() => {
    setTimeout(() => {
      if (open && formRef.current) {
        formRef.current.style.marginTop = `calc(50vh - (${formRef.current.clientHeight}px / 2))`
        formRef.current.style.opacity = '1'
      }
    })
  }, [open, formRef.current, img])

  useEffect(() => {
    setIsLoading(loading)
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
      <label className="edit-products-img-label" htmlFor="icon-button-photo">
        <Button color="primary" component="span">
          <FontAwesomeIcon icon={faCamera as any} size="2x"/>
          <span className="edit-products-img-label__text">Выберите изображение</span>
        </Button>
      </label>
      {img && <img className="edit-products-img-preview" src={img} alt="img"/>}
      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader className="auth-spinner" type="spinner" size={50} /> : 'Сохранить'}
      </Button>
      <p className="">{createProductErrors.map((error) => error)}</p>
    </form>
  )
}

export default EditModalForm
