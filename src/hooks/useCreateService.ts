import { useState, useEffect } from 'react'
import { useNews } from '../contexts/newsContext/NewsContext'
import { ServiceFields } from '../types/service'
import { useServices } from '../contexts/servicesContext/ServicesContext'

type UseCreateService = (
  values: ServiceFields,
  errors: boolean,
  handleClose: () => void
) => ({
  createServiceErrors: string[]
  loading: boolean
})

const useCreateService: UseCreateService = (values, errors, handleClose) => {
  // state
  const [createServiceErrors, setCreateServiceErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { uploadService } = useServices()

  useEffect(() => {
    if (errors) return
    createService()
  }, [values, errors])

  const createService = () => {
    const errors: string[] = []
    setCreateServiceErrors([])
    setLoading(true)

    console.log(values)
    // uploadService(values)
    //     .then(() => {
    //       handleClose()
    //       setLoading(false)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       error.push('Не удалось создать услугу!')
    //       setLoading(false)
    //     })

    setCreateServiceErrors(errors)
  }

  return { createServiceErrors, loading }
}

export default useCreateService
