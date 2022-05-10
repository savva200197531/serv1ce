import React, { useContext, useEffect, useState } from 'react'
import { DeleteService, GetService, ServicesContextProps, UploadService } from './types'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, set, push, onValue, remove } from 'firebase/database'
import { db, storage } from '../../firebase-config'
import { v4 } from 'uuid'
import { Service } from '../../types/service'

const ServicesContext = React.createContext<ServicesContextProps>({} as ServicesContextProps)

export const useServices = () => useContext(ServicesContext)

export const ServicesProvider: React.FC = ({ children }) => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const imagesRef = (id = '') => storageRef(storage, `servicesImages/${id}`)
  const servicesRef = (id = '') => databaseRef(db, `services/${id}`)

  const uploadService: UploadService = ({ name, description, cost, imgFile }) => {
    if (imgFile) {
      const id = v4()

      return uploadBytes(imagesRef(id), imgFile)
          .then(() => getDownloadURL(imagesRef(id)))
          .then(url => set(push(servicesRef()), {
            name,
            description,
            cost,
            url,
          }))
    }

    return set(push(servicesRef()), {
      name,
      description,
      cost,
    })
  }

  const deleteService: DeleteService = (id) => {
    return remove(servicesRef(id)).catch(error => {
      console.log(error)
    })
  }

  const watchServices = () => {
    setLoading(true)

    onValue(servicesRef(), (snapshot) => {
      if (!snapshot.exists()) {
        setServices([])
        return setLoading(false)
      }
      const value = snapshot.val()
      setServices(Object.keys(value).map(key => ({
        ...value[key],
        id: key,
      })).reverse())
      setLoading(false)
    })
  }

  const getService: GetService = (id) => services.find(service => service.id === id) as Service

  useEffect(() => {
    watchServices()
  }, [])

  const value = {
    services,
    loading,
    uploadService,
    deleteService,
    getService,
  }

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
}
