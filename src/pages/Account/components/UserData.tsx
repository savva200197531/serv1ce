import React from 'react'
import useAccountOutletContext from '../useAccountOutletContext'

const UserData: React.FC = ({}) => {
  const { user } = useAccountOutletContext()

  return (
    <div className="user-data">
      <img src={user.avatar} alt="" />
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  )
}

export default UserData
