import React from 'react'
import { Order } from '../../../types/orders'
import InfoField from '../../../components/InfoField/InfoField'

type Props = {
  order: Order
}

const orderLabels: {[key: string]: string} = {
  id: 'Номер заказа',
  lastName: 'Фамилия',
  phone: 'Телефон',
  email: 'Email',
  name: 'Имя',
  skype: 'Skype',
  middleName: 'Отчество',
  address: 'Адрес предоставления услуг',
  terms: 'Сроки окончания работ',
  material: 'Материал который присутствует',
  description: 'Описание услуг',
  time: 'Время по которому с клиентом можно связаться в течение недели',
}

const OrderLayout: React.FC<Props> = ({ order }) => {
  return (
    <div className="order white-box">
      {Object.keys(orderLabels).map(key => (
        <InfoField key={key} label={orderLabels[key]} text={order[key]} />
      ))}
    </div>
  )
}

export default OrderLayout
