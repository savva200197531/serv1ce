import React, { useEffect, useState } from 'react'
import './header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, useMediaQuery } from '@mui/material'
import BurgerMenu from './BurgerMenu'
import logo from '../../assets/images/logo.png'
import logoCut from '../../assets/images/logo-cut.png'

type PageType = 'signup' | 'login' | 'other'

// шапка сайта
const Header: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isTablet = useMediaQuery('(max-width:760px)')
  const isMobile = useMediaQuery('(max-width:480px)')

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
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Button color="primary" onClick={() => navigate('/')}>
            <img className="logo" src={isMobile ? logoCut : logo} alt="лого"/>
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
                {!isTablet && (
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
                  </>
                )}

                <BurgerMenu />
                {/*<CartButton />*/}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
