import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

type PageType = 'register' | 'login' | 'other'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [pageType, setPageType] = useState<PageType>()

  const checkPageType = () => {
    if (pathname.includes('register')) {
      return 'register'
    } else if (pathname.includes('login')) {
      return 'login'
    } else {
      return 'other'
    }
  }

  useEffect(() => {
    setPageType(checkPageType())
  }, [pathname])

  return (
    <footer className="header">
      <div className="container">
        <div className="header-content">
          {pageType === 'login' && <Button variant="outlined" color="inherit" onClick={() => navigate('/auth/register')}>
            Зарегистрироваться
          </Button>}

          {pageType === 'register' && <Button variant="outlined" color="inherit" onClick={() => navigate('/auth/login')}>
            Войти
          </Button>}

          {pageType === 'other' && <Button variant="outlined" color="inherit">
            Выйти
          </Button>}
        </div>
      </div>
    </footer>
  )
}

export default Header
