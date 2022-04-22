import React, { useContext, useState } from 'react'
import { CommentsContextProps, UploadComment } from './types'
import { ref as databaseRef, set, push } from 'firebase/database'
import { db } from '../../firebase-config'
import { useAuth } from '../authContext/AuthContext'
import { formatDate } from '../../helpers/formatDate'

const CommentsContext = React.createContext<CommentsContextProps>({} as CommentsContextProps)

export const useComments = () => useContext(CommentsContext)

export const CommentsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)

  const { user } = useAuth()

  const commentsRef = (id = '') => databaseRef(db, `comments/${id}`)

  const uploadComment: UploadComment = ({ comment, id }) => {
    return set(push(commentsRef(id)), {
      comment,
      date: formatDate(new Date()),
      user,
    }).catch(error => {
      console.log(error)
    })
  }

  const value = {
    loading,
    uploadComment,
  }

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>
}
