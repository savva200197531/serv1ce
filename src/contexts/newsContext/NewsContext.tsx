import React, { useContext, useEffect, useState } from 'react'
import { DeleteNews, NewsContextProps, UploadComment, UploadNews } from './types'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, set, push, onValue, remove } from 'firebase/database'
import { db, storage } from '../../firebase-config'
import { News } from '../../types/news'
import { v4 } from 'uuid'
import { useAuth } from '../authContext/AuthContext'

const NewsContext = React.createContext<NewsContextProps>({} as NewsContextProps)

export const useNews = () => useContext(NewsContext)

export const NewsProvider: React.FC = ({ children }) => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { user } = useAuth()

  const imagesRef = (id = '') => storageRef(storage, `newsImages/${id}`)
  const newsRef = (id = '') => databaseRef(db, `news/${id}`)
  const commentsRef = (id = '') => databaseRef(db, `comments/${id}`)

  const uploadNews: UploadNews = (value) => {
    const id = v4()

    const date = new Date()

    const time = `${date.getHours()}:${date.getMinutes()}`

    return uploadBytes(imagesRef(id), value.imgFile)
        .then(() => getDownloadURL(imagesRef(id)))
        .then(url => set(push(newsRef()), {
          ...value,
          user: user.email,
          time,
          url,
        }))
  }

  const deleteNews: DeleteNews = (news) => {
    return remove(newsRef(news.id)).catch(error => {
      console.log(error)
    })
  }

  // comments/postId/push(comment)

  const uploadComment: UploadComment = (payload) => {
    return set(push(commentsRef(payload.id)), {
      ...payload,
    })
  }

  const watchNews = () => {
    setLoading(true)

    onValue(newsRef(), (snapshot) => {
      if (!snapshot.exists()) {
        setNews([])
        return setLoading(false)
      }
      const value = snapshot.val()
      setNews(Object.keys(value).map(key => ({
        ...value[key],
        id: key,
      })).reverse())
      setLoading(false)
    })
  }

  useEffect(() => {
    watchNews()
  }, [])


  const value = {
    uploadNews,
    loading,
    news,
    deleteNews,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}
