import React, { useState } from 'react'
import './news.scss'
import { useNews } from '../../contexts/newsContext/NewsContext'
import Loader from 'react-ts-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faUser, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Button, IconButton, Popover } from '@mui/material'
import EditNewsModal from './components/EditNewsModal'
import { useAuth } from '../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'

const News = () => {
  const { news, loading: newsLoading, deleteNews } = useNews()
  const { user, loading: userLoading } = useAuth()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <section className="news">
      <div className="container">
        <div className="news-content">
          {userLoading ? <Loader type="dualring" size={20} /> : user.admin && <EditNewsModal />}
          <div className="news-items">
            {newsLoading ? <Loader type="dualring" size={50} /> : news.map(item => (
              <div className="news-item" key={item.id}>
                <div className="news-header">
                  <div className="news-header__left">
                    <p className="news-header__time">22:30</p>
                    <h4 className="news-header__title">{item.name}</h4>
                  </div>

                  <IconButton color="inherit" onClick={handleClick}>
                    <FontAwesomeIcon icon={faEllipsis as any} size="sm"/>
                  </IconButton>

                  <Popover
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    className="popover"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <div className="list-popover-content">
                      {user.admin && (
                        <Button variant="text" onClick={() => deleteNews(item)}>
                          Удалить
                        </Button>
                      )}
                      <Button variant="text" onClick={() => navigate('/contacts')}>
                        Пожаловаться
                      </Button>
                    </div>
                  </Popover>
                </div>

                <div className="news-main">
                  <p className="news-description">{item.description}</p>
                  <figure className="news-img__wrapper">
                    <img className="news-img" src={item.url} alt="news img"/>
                  </figure>
                </div>

                <Button className="news-author" color="inherit" variant="text">
                  <FontAwesomeIcon icon={faUser as any} size="lg"/>
                  <span className="news-author__text">Максим Максименко</span>
                </Button>

                <div className="news-actions">
                  <IconButton color="error">
                    <FontAwesomeIcon className="news-actions__like" icon={faHeart as any} size="sm" />
                  </IconButton>
                  <IconButton color="inherit">
                    <FontAwesomeIcon className="news-actions__comment" icon={faComment as any} size="sm"/>
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default News
