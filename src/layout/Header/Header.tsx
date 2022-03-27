import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useAuth } from '../../contexts/authContext/AuthContext'

type PageType = 'signup' | 'login' | 'other'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { logout } = useAuth()

  const [pageType, setPageType] = useState<PageType>()

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

  return (
    <footer className="header">
      <div className="container">
        <div className="header-content">
          {pageType === 'login' && <Button variant="outlined" color="inherit" onClick={() => navigate('/auth/signup')}>
            Зарегистрироваться
          </Button>}

          {pageType === 'signup' && <Button variant="outlined" color="inherit" onClick={() => navigate('/auth/login')}>
            Войти
          </Button>}

          {pageType === 'other' && <Button variant="outlined" color="inherit" onClick={logout}>
            Выйти
          </Button>}
        </div>
      </div>
    </footer>
  )
}

export default Header
