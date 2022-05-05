import React from 'react'
import useAccountOutletContext from '../useAccountOutletContext'

const UserData: React.FC = ({}) => {
  const { user } = useAccountOutletContext()

  return (
    <div>
      <img src={user.avatar} alt="" />
      {user.name}
      {user.email}
    </div>
  )
}

export default UserData
