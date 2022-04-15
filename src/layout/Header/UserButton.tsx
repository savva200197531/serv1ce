import React from 'react'
import { Button, Popover } from '@mui/material'
import Loader from 'react-ts-loaders'
import { useAuth } from '../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const UserButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  const { logout, loading, user } = useAuth()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const buttons = [
    {
      text: 'Редактор новостей',
      onClick: () => {
        handleClose()
        navigate('/admin/news')
      },
      isHidden: !user.admin,
    },
    {
      text: 'Личный кабинет',
      onClick: () => {
        handleClose()
        navigate('/account')
      },
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
        logout().then(() => {})
      },
      isHidden: !!user.uid,
    },
    {
      text: 'Выйти',
      onClick: () => {
        handleClose()
        navigate('/auth/login')
      },
      isHidden: !user.uid,
    },
  ]

  return (
    loading ?
        <Loader type="dualring" size={50} /> :
        <>
          <Button variant="outlined" color="inherit" onClick={handleClick}>
            <FontAwesomeIcon icon={faBars as any} size="lg"/>
          </Button>
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            className="popover"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className="popover-content">
              {buttons.map(({ text, onClick, isHidden = false }, index: number) => (
                !isHidden && <Button key={index} variant="outlined" color="inherit" onClick={onClick}>
                  {text}
                </Button>
              ))}
            </div>
          </Popover>
        </>

  )
}

export default UserButton
