import React, { useRef, useState } from 'react'
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import Login from './sections/Login'
import Register from './sections/Register'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './Auth.scss'

type Props = {}

const Auth: React.FC<Props> = () => {
  // const [registerEmail, setRegisterEmail] = useState<string>('');
  // const [registerPassword, setRegisterPassword] = useState<string>('');
  // const [loginEmail, setLoginEmail] = useState<string>('');
  // const [loginPassword, setLoginPassword] = useState<string>('');

  return (
    <div className="auth">
      <Outlet />
    </div>
  )
}

export default Auth
