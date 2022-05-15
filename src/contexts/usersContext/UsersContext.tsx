import React, { useContext, useEffect, useState } from 'react'
import { onValue, ref as databaseRef } from 'firebase/database'
import { db } from '../../firebase-config'
import { UsersContextProps } from './types'
import { Users } from '../../types/user'

const UsersContext = React.createContext<UsersContextProps>({} as UsersContextProps)

export const useUsers = () => useContext(UsersContext)

export const UsersProvider: React.FC = ({ children }) => {
  const userRef = () => databaseRef(db, `users`)

  const [loading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<Users>({} as Users)

  const watchUsers = () => {
    setLoading(true)

    onValue(userRef(), (snapshot) => {
      if (!snapshot.exists()) {
        setUsers({})
        return setLoading(false)
      }
      const value = snapshot.val()
      setUsers(value)

      setLoading(false)
    })
  }

  useEffect(() => {
    watchUsers()
  }, [])

  const value = {
    loading,
    users,
  }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
