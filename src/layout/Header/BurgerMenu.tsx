import React, { useState } from 'react'
import { Button, Popover, useMediaQuery } from '@mui/material'
import Loader from 'react-ts-loaders'
import { useAuth } from '../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const BurgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  const isTablet = useMediaQuery('(max-width:760px)')

  const { logout, loading, user, isAuth } = useAuth()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const buttons = [
    {
      text: 'Услуги',
      onClick: () => {
        handleClose()
        navigate('/services')
      },
      isHidden: !isTablet,
    },
    {
      text: 'О нас',
      onClick: () => {
        handleClose()
        navigate('/about')
      },
      isHidden: !isTablet,
    },
    {
      text: 'Контакты',
      onClick: () => {
        handleClose()
        navigate('/contacts')
      },
      isHidden: !isTablet,
    },
    {
      text: 'Личный кабинет',
      onClick: () => {
        handleClose()
        navigate('/account')
      },
      isHidden: !isAuth,
    },
    {
      text: 'Заказы',
      onClick: () => {
        handleClose()
        navigate('/orders')
      },
      isHidden: !isAuth,
    },
    {
      text: 'Зарегистрироваться',
      onClick: () => {
        handleClose()
        navigate('/auth/signup')
      },
      isHidden: !!user.uid,
    },
    {
      text: 'Войти',
      onClick: () => {
        handleClose()
        navigate('/auth/login')
      },
      isHidden: !!user.uid,
    },
    {
      text: 'Выйти',
      onClick: () => {
        handleClose()
        logout().then(() => {})
      },
      isHidden: !user.uid,
    },
  ]

  return (
    <div className="burger-menu">
      {loading ?
        <Loader type="dualring" size={50} /> :
        <>
          <Button color="primary" onClick={handleClick}>
            <FontAwesomeIcon icon={faBars as any} size="lg"/>
          </Button>
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
              {buttons.map(({ text, onClick, isHidden = false }, index: number) => (
                !isHidden && <Button key={index} color="primary" onClick={onClick}>
                  {text}
                </Button>
              ))}
            </div>
          </Popover>
        </>
      }
    </div>
  )
}

export default BurgerMenu
