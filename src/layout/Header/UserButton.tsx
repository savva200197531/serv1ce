import React from 'react'
import { Button, Popover } from '@mui/material'
import Loader from 'react-ts-loaders'
import { useAuth } from '../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'

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
      text: 'Редактор товаров',
      onClick: () => {
        handleClose()
        navigate('/admin/products')
      },
      isHidden: !user.admin,
    },
    {
      text: 'Выйти',
      onClick: () => {
        handleClose()
        logout().then(() => {})
      },
    },
  ]

  return (
    loading ?
        <Loader type="spinner" size={50} /> :
        <>
          <Button variant="outlined" color="inherit" onClick={handleClick}>
            {user.email}
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
                !isHidden && <Button key={index} variant="outlined" color="primary" onClick={onClick}>
                  {text}
                </Button>
              ))}
            </div>
          </Popover>
        </>

  )
}

export default UserButton
