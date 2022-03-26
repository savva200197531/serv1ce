import React, { useRef } from 'react'
import { Button, FormControl, Input, InputLabel } from '@mui/material'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  const loginRef = useRef(null)
  const passwordRef = useRef(null)

  return <>
    <form className="auth-form">
      <FormControl>
        <InputLabel color="error" htmlFor="email" ref={loginRef}>
        Email
        </InputLabel>
        <Input color="error" id="email" aria-describedby="email" />
        {/* <FormHelperText id="email">We'll never share your email.</FormHelperText>*/}
      </FormControl>

      <FormControl>
        <InputLabel color="error" htmlFor="password" ref={passwordRef}>
        Пароль
        </InputLabel>
        <Input color="error" id="password" aria-describedby="password" />
        {/* <FormHelperText id="password">Минимальная длина пароля 6 символов</FormHelperText>*/}
      </FormControl>

      <Button variant="contained" color="error" type="submit">
      Войти
      </Button>
    </form>
  </>
}

export default Login
