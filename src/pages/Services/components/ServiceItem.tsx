import React, { useState } from 'react'
import { Button, IconButton, Popover } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faUser } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-ts-loaders'
import { News } from '../../../types/news'
import { useNews } from '../../../contexts/newsContext/NewsContext'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'

type Props = {
  item: News
}

const ServiceItem: React.FC<Props> = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { deleteNews } = useNews()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="news-item" key={item.id}>
      <div className="news-header">
        <div className="news-header__left">
          <p className="time">{item.date}</p>
          <h4 className="news-header__title">{item.title}</h4>
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
              <Button disabled={isLoading} variant="text" onClick={() => {
                setIsLoading(true)
                deleteNews(item.id).finally(() => {
                  setIsLoading(false)
                  handleClose()
                })
              }}>
                {isLoading ? <Loader type="dualring" size={20} /> : 'Удалить'}
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
        <span className="news-author__text">{item.user.name}</span>
      </Button>
    </div>
  )
}

export default ServiceItem
