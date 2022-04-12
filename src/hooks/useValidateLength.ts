import { useState, useEffect } from 'react'

type UseValidateLength = (length: string, formSubmit: boolean, type: 'min' | 'max') => ({
  lengthErrors: string[]
})

const useValidateLength: UseValidateLength = (value: string, formSubmit, type) => {
  const [lengthErrors, setLengthErrors] = useState<string[]>([])

  useEffect(() => {
    if (!formSubmit) return
    setValidationErrors()
  }, [formSubmit, value])

  const setValidationErrors = () => {
    setLengthErrors([])
    const messages: string[] = []

    return setLengthErrors(messages)
  }

  return { lengthErrors }
}

export default useValidateLength
