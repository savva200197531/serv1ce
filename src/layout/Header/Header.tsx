import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useAuth } from '../../contexts/authContext/AuthContext'

type PageType = 'signup' | 'login' | 'other'

// шапка сайта
const Header: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { logout, loading, user } = useAuth()

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

  // не даю пользователя перейти пользователю на главную страницу, если он не не вошел в аккаунт
  // и не даю перейти на страницу аунтефикации, если он уже вошел на сайт
  useEffect(() => {
    if (loading) return
    if (!localStorage.getItem('token') && (pageType !== 'signup' && pageType !== 'login')) {
      navigate('/auth/login')
    }
    if (localStorage.getItem('token') && (pageType === 'signup' || pageType === 'login')) {
      navigate('/')
    }
  }, [pageType, loading])

  useEffect(() => {
    console.log(user)
  }, [user])

  // верстка
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

          {pageType === 'other' && <>
            <Button variant="outlined" color="inherit" onClick={() => navigate('/')}>
              Главная
            </Button>
            {user.admin && <Button variant="outlined" color="inherit" onClick={() => navigate('/admin/products')}>
              Редактор товаров
            </Button>}
            <Button variant="outlined" color="inherit" onClick={logout}>
              Выйти
            </Button>
          </>}
        </div>
      </div>
    </footer>
  )
}

export default Header
