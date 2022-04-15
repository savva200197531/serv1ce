import { useState, useEffect } from 'react'
import { NewsFields } from '../types/news'
import { useNews } from '../contexts/newsContext/NewsContext'

type UseCreateNews = (
  values: NewsFields,
  errors: boolean,
  handleClose: () => void
) => ({
  createNewsErrors: string[]
  loading: boolean
})

const useCreateNews: UseCreateNews = (values, errors, handleClose) => {
  // state
  const [createNewsErrors, setCreateNewsErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { uploadNews } = useNews()

  useEffect(() => {
    if (errors) return
    createNews()
  }, [values, errors])

  const createNews = () => {
    const errors: string[] = []
    setCreateNewsErrors([])
    setLoading(true)

    uploadNews(values)
        .then(() => {
          handleClose()
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          error.push('Не удалось создать продукт!')
          setLoading(false)
        })

    setCreateNewsErrors(errors)
  }

  return { createNewsErrors, loading }
}

export default useCreateNews
