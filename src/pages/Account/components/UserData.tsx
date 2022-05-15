import React from 'react'
import useAccountOutletContext from '../useAccountOutletContext'
import InfoField from '../../../components/InfoField/InfoField'

const UserData: React.FC = ({}) => {
  const { user } = useAccountOutletContext()

  return (
    <div className="user-data account-content__item">
      <img src={user.avatar} alt="" />
      <InfoField label="Имя" text={user.name || 'не установлено'} />
      <InfoField label="Email" text={user.email} />
    </div>
  )
}

export default UserData
