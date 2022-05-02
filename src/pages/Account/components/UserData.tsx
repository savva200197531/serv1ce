import React from 'react'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import Loader from 'react-ts-loaders'

const UserData: React.FC = ({}) => {
  const { user, loading } = useAuth()

  return (
    loading ?
      <Loader type="dualring" size={50} /> :
      <div>
        {user.name}
        {user.email}
      </div>
  )
}

export default UserData
