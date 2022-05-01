import { InputProps } from '@mui/material'

export interface FormField extends InputProps {
  id: string
  name: string
  setState: (value: string) => void
  errors?: string[]
}
