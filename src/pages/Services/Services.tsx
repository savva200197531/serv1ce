import React from 'react'
import './services.scss'
import { useServices } from '../../contexts/servicesContext/ServicesContext'
import Loader from 'react-ts-loaders'
import { useAuth } from '../../contexts/authContext/AuthContext'
import ServiceItem from './components/ServiceItem'
import ServiceModal from './components/ServiceModal'

const Services = () => {
  const { services, loading: servicesLoading } = useServices()
  const { user, loading: userLoading } = useAuth()

  return (
    <section className="services">
      <div className="container">
        <div className="services-content">
          {userLoading ? <Loader type="dualring" size={20} /> : user.admin && <ServiceModal />}
          <div className="services-items">
            {servicesLoading ? <Loader type="dualring" size={50} /> : services.length ? services.map((item) => (
              <ServiceItem key={item.id} item={item} />
            )) : <div className="tea-c">Услуг нет</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
