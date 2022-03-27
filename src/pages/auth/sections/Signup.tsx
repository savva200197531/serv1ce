import React, { FormEvent, useEffect, useState } from 'react'
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import useSignup from '../../../hooks/useSignup'
import { Creds, SignupField } from '../../../types/user'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidatePassword from '../../../hooks/useValidatePassword'
import Loader from 'react-ts-loaders'

const Signup: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const [fields, setFields] = useState<SignupField[]>([
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
    {
      id: 'password-confirm',
      name: 'Подтверждение пароля',
      setState: setPasswordConfirm,
      errors: [],
    },
  ])
  const [creds, setCreds] = useState<Creds>({} as Creds)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  const { signupErrors, loading } = useSignup(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors, passwordConfirmErrors } = useValidatePassword(creds, formSubmit)

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
    const messages: string[] = [...passwordErrors, ...passwordConfirmErrors, ...emailErrors]
    if (!messages.length && formSubmit) {
      setHasErrors(false)
      setErrors(signupErrors)
    }

    setFields(fields.map((field: SignupField) => {
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
        case 'password-confirm':
          return {
            ...field,
            errors: passwordConfirmErrors,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [emailErrors, passwordErrors, signupErrors])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return <>
    <form className="auth-form signup-form" onSubmit={handleSubmit}>
      {fields.map((field: SignupField) => (
        <FormControl key={field.id}>
          <InputLabel color="error" htmlFor={field.id}>
            {field.name}
          </InputLabel>
          <Input
            color="error"
            id="login"
            aria-describedby="login"
            onChange={(event) => field.setState(event.target.value)}
          />
          <FormHelperText
            id={field.id}
            color="error"
          >
            {field.errors.map((error: string, index: number) =>
              <React.Fragment key={index}>{index !== 0 && ' '}{error}</React.Fragment>,
            )}
          </FormHelperText>
        </FormControl>
      ))}

      <Button variant="contained" color="error" type="submit" disabled={isLoading}>
        {isLoading ? <Loader className="auth-spinner" type="spinner" size={50} /> : 'Зарегистрироваться'}
      </Button>
      {errors.map((error) => error)}
    </form>
  </>
}

export default Signup
