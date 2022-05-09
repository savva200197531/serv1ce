import { useState, useEffect } from 'react'
import { NewsFields } from '../types/news'
import { useNews } from '../contexts/newsContext/NewsContext'
import { ServiceFormFields } from '../types/service'

type UseSubmitServiceForm = (
  values: ServiceFormFields,
  errors: boolean,
) => ({
  submitServiceFormErrors: string[]
  loading: boolean
})

const useSubmitServiceForm: UseSubmitServiceForm = (values, errors) => {
  // state
  const [submitServiceFormErrors, setSubmitServiceFormErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { uploadNews } = useNews()

  useEffect(() => {
    if (errors) return
    submitServiceForm()
  }, [values, errors])

  const submitServiceForm = () => {
    const errors: string[] = []
    setSubmitServiceFormErrors([])
    setLoading(true)

    uploadNews(values)
        .then(() => {
          handleClose()
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          error.push('Не удалось создать новость!')
          setLoading(false)
        })

    setSubmitServiceFormErrors(errors)
  }

  return { submitServiceFormErrors, loading }
}

export default useSubmitServiceForm
