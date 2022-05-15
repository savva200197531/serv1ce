import { useState, useEffect } from 'react'
import { ServiceFormFields } from '../types/service'
import { push, set } from 'firebase/database'
import { ref as databaseRef } from '@firebase/database'
import { db } from '../firebase-config'

type UseSubmitServiceForm = (
  values: ServiceFormFields,
  errors: boolean,
) => ({
  submitServiceFormErrors: string[]
  loading: boolean
  success: boolean
})

const useSubmitServiceForm: UseSubmitServiceForm = (values, errors) => {
  // state
  const [submitServiceFormErrors, setSubmitServiceFormErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (errors) return
    submitServiceForm()
  }, [values, errors])

  const submitServiceForm = () => {
    const errors: string[] = []
    setSubmitServiceFormErrors([])
    setLoading(true)
    setSuccess(false)

    set(push(databaseRef(db, 'orders')), values).then(() => {
      setLoading(false)
      setSuccess(true)
    }).catch((error) => {
      console.log(error)
      error.push('Не удалось оформить заявку!')
      setLoading(false)
    })

    setSubmitServiceFormErrors(errors)
  }

  return { submitServiceFormErrors, loading, success }
}

export default useSubmitServiceForm
