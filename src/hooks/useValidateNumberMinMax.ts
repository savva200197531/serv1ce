import { useState, useEffect } from 'react'

type UseValidateNumberMinMax = (
  value: number,
  number: {
    min?: number
    max?: number
  },
  formSubmit: boolean
) => ({
  numberErrors: string[]
})

const useValidateNumberMinMax: UseValidateNumberMinMax = (
    value,
    number,
    formSubmit,
) => {
  const [numberErrors, setNumberErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit, value])

  const setValidationErrors = () => {
    setNumberErrors([])
    const messages: string[] = []

    if (number.min && value < number.min) {
      messages.push(`Число должно быть больше ${number.min}`)
    }

    if (number.max && value > number.max) {
      messages.push(`Число должно быть меньше ${number.max}`)
    }

    setNumberErrors(messages)
  }

  return { numberErrors }
}

export default useValidateNumberMinMax
