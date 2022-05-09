import React from 'react'
import { Service } from '../../../types/service'

type Props = {
  item: Service
}

const ServiceItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="service-item" key={item.id}>
      123
    </div>
  )
}

export default ServiceItem
