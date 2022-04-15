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

  // верстка
  return (
    <footer className="header">
      <div className="container">
        <div className="header-content">
          <Button color="primary" onClick={() => navigate('/')}>
            Serv1ce
          </Button>

          <div className="header-right">
            {pageType === 'login' && <Button className="auth-button" color="primary" onClick={() => navigate('/auth/signup')}>
              Зарегистрироваться
            </Button>}

            {pageType === 'signup' && <Button className="auth-button" color="primary" onClick={() => navigate('/auth/login')}>
              Войти
            </Button>}

            {pageType === 'other' && (
              <>
                <Button color="primary" onClick={() => navigate('/services')}>
                  Услуги
                </Button>

                <Button color="primary" onClick={() => navigate('/about')}>
                  О нас
                </Button>

                <Button color="primary" onClick={() => navigate('/contacts')}>
                  Контакты
                </Button>

                <UserButton />
                {/*<CartButton />*/}
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Header
