import React from 'react'
import { Outlet } from 'react-router-dom'
import './Auth.scss'
import logo from '../../assets/images/logo.png'

type Props = {}

const Auth: React.FC<Props> = () => {
  return (
    <div className="auth">
      <Outlet />
    </div>
  )
}

export default Auth
