import React from 'react'
import { useParams } from 'react-router-dom'
import { useServices } from '../../../contexts/servicesContext/ServicesContext'
import Loader from 'react-ts-loaders'

const ServiceInfo: React.FC = () => {
  const { getService, loading } = useServices()

  const params = useParams()

  const service = getService(params.id as string)

  return (
    <div className="service-form-info">
      <h1>Оформить заявку</h1>
      {loading ?
        <Loader type="dualring" size={20}/> :
        <p>Услуга: <span>{service.name}</span></p>
      }
    </div>
  )
}

export default ServiceInfo
