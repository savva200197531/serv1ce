import React, { FormEvent, useEffect, useState } from 'react'
import { Button, FormControl, Input, InputLabel } from '@mui/material'
import useSignup from '../../../hooks/useSignup'
import { Creds } from '../../../types/user'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidatePassword from '../../../hooks/useValidatePassword'

const Register: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const [creds, setCreds] = useState<Creds>({
    login: '',
    password: '',
    passwordConfirm: '',
  })
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  const { signupErrors, loading } = useSignup(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors } = useValidatePassword(creds, formSubmit)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      login,
      password,
      passwordConfirm,
    })
    setFormSubmit(true)
  }

  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...emailErrors]
    if (!messages.length && formSubmit) {
      setHasErrors(false)
      messages.push(...signupErrors)
    }
    setErrors(messages)
  }, [emailErrors, passwordErrors, signupErrors])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return <>
    <form className="auth-form register-form" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel color="error" htmlFor="login">
          Email
        </InputLabel>
        <Input
          color="error"
          id="login"
          aria-describedby="login"
          onChange={(event) => setLogin(event.target.value)}
        />
        {/* <FormHelperText id="email">We'll never share your email.</FormHelperText>*/}
      </FormControl>

      <FormControl>
        <InputLabel color="error" htmlFor="password">
          Пароль
        </InputLabel>
        <Input
          color="error"
          id="password"
          aria-describedby="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* <FormHelperText id="password">Минимальная длина пароля 6 символов</FormHelperText>*/}
      </FormControl>

      <FormControl>
        <InputLabel color="error" htmlFor="password-confirm">
          Подтверждение пароля
        </InputLabel>
        <Input
          color="error"
          id="password-confirm"
          aria-describedby="password"
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />
        {/* <FormHelperText id="password">Минимальная длина пароля 6 символов</FormHelperText>*/}
      </FormControl>

      <Button variant="contained" color="error" type="submit">
        Зарегистрироваться
      </Button>
    </form>
  </>
}

export default Register
