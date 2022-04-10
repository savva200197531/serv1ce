import React, { FormEvent, forwardRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './edit-products.scss'
import { FormControl, FormHelperText, Input, InputLabel, Modal, TextField } from '@mui/material'
import { FormField } from '../../../types/form'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = forwardRef<NumberFormat<any>, CustomProps>(
    function NumberFormatCustom(props, ref) {
      const { onChange, ...other } = props

      return (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            })
          }}
          thousandSeparator
          isNumericString
          prefix="₽"
        />
      )
    },
)

const EditProducts: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [cost, setCost] = useState<string>('123')
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'cost',
      name: 'Cost',
      setState: setCost,
      inputComponent: NumberFormatCustom as any,
      errors: [],
    },
  ])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <section className="edit-products">
      <div className="container">
        <div className="edit-products-content">
          <div className="product-card-edit" onClick={handleOpen}>
            <FontAwesomeIcon icon={faPlus as any} size="2x"/>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <form className="edit-products-form" onSubmit={handleSubmit}>
              {fields.map(field => (
                <FormControl key={field.id}>
                  <InputLabel color="primary" htmlFor={field.id}>
                    {field.name}
                  </InputLabel>
                  <Input
                    color="primary"
                    id={field.id}
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
            </form>
          </Modal>
        </div>
      </div>
    </section>
  )
}

export default EditProducts
