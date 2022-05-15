import React from 'react'
import useAccountOutletContext from '../useAccountOutletContext'

const UserData: React.FC = ({}) => {
  const { user } = useAccountOutletContext()

  return (
    <div className="user-data">
      <img src={user.avatar} alt="" />
      <p className="info-field"><span>Имя:</span> {user.name || 'не установлено'}</p>
      <p className="info-field"><span>Email:</span> {user.email}</p>
    </div>
  )
}

export default UserData
