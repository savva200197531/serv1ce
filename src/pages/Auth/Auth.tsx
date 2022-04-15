import React from 'react'
import { Outlet } from 'react-router-dom'
import './Auth.scss'
import logo from '../../assets/images/logo.png'

type Props = {}

const Auth: React.FC<Props> = () => {
  return (
    <div className="auth">
      <h2 className="auth-logo">Serv1ce</h2>
      <Outlet />
    </div>
  )
}

export default Auth
