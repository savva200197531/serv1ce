import React, { useRef, useState } from 'react'
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import Login from './sections/Login'
import Signup from './sections/Signup'
import { Link, Outlet, useLocation } from 'react-router-dom'
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
