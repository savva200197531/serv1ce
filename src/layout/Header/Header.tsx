import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useAuth } from '../../contexts/authContext/AuthContext'
import UserButton from './UserButton'

type PageType = 'signup' | 'login' | 'other'

// шапка сайта
const Header: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { loading, user } = useAuth()

  const [pageType, setPageType] = useState<PageType>()

  // проверяю тип страницы
  const checkPageType = () => {
    if (pathname.includes('signup')) {
      return 'signup'
    } else if (pathname.includes('login')) {
      return 'login'
    } else {
      return 'other'
    }
  }

  useEffect(() => {
    setPageType(checkPageType())
  }, [pathname])

  useEffect(() => {
    if (loading) return
    if (pathname.includes('admin') && !user.admin) {
      navigate(-1)
    }
  }, [loading, pathname])


  // верстка
  return (
    <footer className="header">
      <div className="container">
        <div className="header-content">
          <Button color="inherit" onClick={() => navigate('/')}>
            Serv1ce
          </Button>

          {pageType === 'login' && <Button className="auth-button" variant="outlined" color="inherit" onClick={() => navigate('/auth/signup')}>
            Зарегистрироваться
          </Button>}

          {pageType === 'signup' && <Button className="auth-button" variant="outlined" color="inherit" onClick={() => navigate('/auth/login')}>
            Войти
          </Button>}

          {pageType === 'other' && (
            <>
              <Button variant="outlined" color="inherit" onClick={() => navigate('/services')}>
                Услуги
              </Button>

              <Button variant="outlined" color="inherit" onClick={() => navigate('/about')}>
                О нас
              </Button>

              <Button variant="outlined" color="inherit" onClick={() => navigate('/contacts')}>
                Контакты
              </Button>

              <UserButton />
              {/*<CartButton />*/}
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Header
