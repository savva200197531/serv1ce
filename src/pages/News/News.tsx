import React from 'react'
import './news.scss'
import { useNews } from '../../contexts/newsContext/NewsContext'
import Loader from 'react-ts-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import EditNewsModal from './components/EditNewsModal';
import { useAuth } from '../../contexts/authContext/AuthContext';

const News = () => {
  const { news, loading: newsLoading, deleteNews } = useNews()
  const { user, loading: userLoading } = useAuth()

  return (
    <section className="news">
      <div className="container">
        <div className="news-content">
          {userLoading ? <Loader type="dualring" size={20} /> : user.admin && <EditNewsModal />}
          <div className="news-items">
            {newsLoading ? <Loader type="dualring" size={50} /> : news.map(item => (
              <div className="news-item" key={item.id}>
                {user.admin && <Button variant="text" color="error" onClick={() => deleteNews(item)}>
                  <FontAwesomeIcon icon={faTrashCan as any} size="lg"/>
                </Button>}
                <p className="news-title">{item.name}</p>
                <p className="news-description">{item.description}</p>
                <img className="news-img" src={item.url} alt=""/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default News
