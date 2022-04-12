import { useState, useEffect } from 'react'

type UseValidateStringMinMax = (
  value: string,
  length: {
    min?: number
    max?: number
  },
  formSubmit: boolean
) => ({
  lengthErrors: string[]
})

const useValidateStringMinMax: UseValidateStringMinMax = (
    value,
    length,
    formSubmit,
) => {
  const [lengthErrors, setLengthErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit, value])

  const setValidationErrors = () => {
    setLengthErrors([])
    const messages: string[] = []

    if (length.min && value.length < length.min) {
      messages.push(`Минимальное количество символов ${length.min}`)
    }

    if (length.max && value.length > length.max) {
      messages.push(`Максимальное количество символов ${length.max}`)
    }

    setLengthErrors(messages)
  }

  return { lengthErrors }
}

export default useValidateStringMinMax
