import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthField, Creds } from '../../../types/user'
import useSignup from '../../../hooks/useSignup'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidatePassword from '../../../hooks/useValidatePassword'
import Loader from 'react-ts-loaders'
import useLogin from '../../../hooks/useLogin'

const Login: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState<AuthField[]>([
    {
      id: 'login',
      name: 'Email',
      setState: setLogin,
      errors: [],
    },
    {
      id: 'password',
      name: 'Пароль',
      setState: setPassword,
      errors: [],
    },
  ])
  const [creds, setCreds] = useState<Creds>({} as Creds)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  const { loginErrors, loading } = useLogin(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      login,
      password,
    })
    setFormSubmit(true)
  }

  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...emailErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: AuthField) => {
      switch (field.id) {
        case 'login':
          return {
            ...field,
            errors: emailErrors,
          }
        case 'password':
          return {
            ...field,
            errors: passwordErrors,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [emailErrors, passwordErrors, loginErrors])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return <>
    <form className="auth-form login-form" onSubmit={handleSubmit}>
      {fields.map((field: AuthField) => (
        <FormControl key={field.id}>
          <InputLabel color="primary" htmlFor={field.id}>
            {field.name}
          </InputLabel>
          <Input
            color="primary"
            id="login"
            aria-describedby="login"
            onChange={(event) => field.setState(event.target.value)}
          />
          <FormHelperText
            id={field.id}
            error
          >
            {field.errors.map((error: string, index: number) =>
              <React.Fragment key={index}>{index !== 0 && ' '}{error}</React.Fragment>,
            )}
          </FormHelperText>
        </FormControl>
      ))}

      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader className="auth-spinner" type="spinner" size={50} /> : 'Войти'}
      </Button>
      <p className="auth-errors">{loginErrors.map((error) => error)}</p>
    </form>
  </>
}

export default Login
