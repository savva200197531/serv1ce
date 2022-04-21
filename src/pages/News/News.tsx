import React from 'react'
import './news.scss'
import { useNews } from '../../contexts/newsContext/NewsContext'
import Loader from 'react-ts-loaders'
import EditNewsModal from './components/EditNewsModal'
import { useAuth } from '../../contexts/authContext/AuthContext'
import NewsItem from './components/NewsItem'

const News = () => {
  const { news, loading: newsLoading } = useNews()
  const { user, loading: userLoading } = useAuth()

  return (
    <section className="news">
      <div className="container">
        <div className="news-content">
          {userLoading ? <Loader type="dualring" size={20} /> : user.admin && <EditNewsModal />}
          <div className="news-items">
            {newsLoading ? <Loader type="dualring" size={50} /> : news.length ? news.map((item) => (
              <NewsItem key={item.id} item={item} />
            )) : <div className="tea-c">Новостей нет</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default News
