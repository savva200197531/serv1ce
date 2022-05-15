import React from 'react'
import { Service } from '../../../types/service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, IconButton } from '@mui/material'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useServices } from '../../../contexts/servicesContext/ServicesContext'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'

type Props = {
  item: Service
}

const ServiceItem: React.FC<Props> = ({ item: { id, name, cost, url, description } }) => {
  const { deleteService } = useServices()
  const { user } = useAuth()

  const navigate = useNavigate()

  return (
    <div className="service-item" key={id}>
      <div className="img-wrapper">
        <div>
          {url ? <img src={url} alt="фото услуги"/> : <div />}
        </div>
      </div>
      <div className="service-info">
        <h5 className="service-title">{name}</h5>
        <p className="info-field"><span>Стоимость:</span> {cost}<span>₽</span></p>
        <p className="info-field"><span>Описание:</span> {description}</p>
      </div>
      <div className="service-actions">
        <Button onClick={() => navigate(`/service/${id}`)} variant="contained" color="primary" className="add-btn">
          Оформить
        </Button>
        {user.admin && <IconButton color="error" onClick={() => deleteService(id)}>
          <FontAwesomeIcon icon={faTrashCan as any} />
        </IconButton>}
      </div>
    </div>
  )
}

export default ServiceItem
