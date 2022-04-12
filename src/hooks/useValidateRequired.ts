import { useState, useEffect } from 'react'

type UseValidateRequired = (
  value: any,
  formSubmit: boolean
) => ({
  requiredErrors: string[]
})

const useValidateRequired: UseValidateRequired = (
    value,
    formSubmit,
) => {
  const [requiredErrors, setRequiredErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit, value])

  const setValidationErrors = () => {
    setRequiredErrors([])
    const messages: string[] = []

    if (!value) {
      messages.push('Поле обязательно для заполнения')
    }

    setRequiredErrors(messages)
  }

  return { requiredErrors }
}

export default useValidateRequired
