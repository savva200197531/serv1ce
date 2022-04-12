import React from 'react'
import { Outlet } from 'react-router-dom'
import './Auth.scss'

type Props = {}

const Auth: React.FC<Props> = () => {
  return (
    <div className="auth">
      <Outlet />
    </div>
  )
}

export default Auth
