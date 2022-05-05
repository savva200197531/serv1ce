import React from 'react'
import './services.scss'
import { useServices } from '../../contexts/servicesContext/ServicesContext'

const Services = () => {
  const { services, uploadService, deleteService, loading } = useServices()

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          {service.name}
          <button onClick={() => deleteService(service.id)}>удалить</button>
        </div>
      ))}
    </div>
  )
}

export default Services
