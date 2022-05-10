import React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { FormField } from './types'

type Props = {
  field: FormField
}

const FormFieldLayout: React.FC<Props> = ({
  field: {
    id,
    name,
    errors,
    setState,
    fullWidth,
    style,
    ...props
  },
}) => {
  return (
    <FormControl style={style} fullWidth={fullWidth} key={id}>
      <InputLabel color="primary" htmlFor={id}>
        {name}
      </InputLabel>
      <Input
        {...props}
        color="primary"
        id={id}
        aria-describedby={id}
        onChange={(event) => setState(event.target.value)}
      />
      <FormHelperText
        id={id}
        error
      >
        {errors?.map((error: string, index) =>
          <React.Fragment key={index}>{index !== 0 && ' '}{error}</React.Fragment>,
        )}
      </FormHelperText>
    </FormControl>
  )
}

export default FormFieldLayout
