import React, { useContext, useEffect, useState } from 'react'
import { CommentsContextProps, UploadComment } from './types'
import { ref as databaseRef, set, push, onValue } from 'firebase/database'
import { db } from '../../firebase-config'
import { useAuth } from '../authContext/AuthContext'
import { formatDate } from '../../helpers/formatDate'
import { Comments } from '../../types/comments'

const CommentsContext = React.createContext<CommentsContextProps>({} as CommentsContextProps)

export const useComments = () => useContext(CommentsContext)

export const CommentsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [comments, setComments] = useState<Comments>({} as Comments)

  const { user } = useAuth()

  const commentsRef = (id = '') => databaseRef(db, `comments/${id}`)

  const uploadComment: UploadComment = ({ comment, id }) => {
    return set(push(commentsRef(id)), {
      text: comment,
      date: formatDate(new Date()),
      uid: user.uid,
    }).catch(error => {
      console.log(error)
    })
  }

  const watchComments = () => {
    setLoading(true)

    onValue(commentsRef(), (snapshot) => {
      if (!snapshot.exists()) {
        setComments({})
        return setLoading(false)
      }
      const value = snapshot.val()
      setComments(Object.keys(value).map(key => {
        const comments = value[key]
        return ({
          key,
          value: Object.keys(comments).map(key => {
            const comment = comments[key]

            return {
              id: key,
              // user: user
              ...comment,
            }
          }),
        })
      }).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {}))

      setLoading(false)
    })
  }

  useEffect(() => {
    watchComments()
  }, [])

  const value = {
    loading,
    uploadComment,
    comments,
    // getNews,
  }

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>
}
