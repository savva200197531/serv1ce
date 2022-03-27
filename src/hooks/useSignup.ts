import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/authContext/AuthContext'
import { Creds } from '../types/user'

type UseSignup = (creds: Creds, errors: boolean) => ({
  signupErrors: string[]
  loading: boolean
})

const useSignup: UseSignup = (creds, errors) => {
  // state
  const [signupErrors, setSignupErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  // other
  const { signup } = useAuth()

  useEffect(() => {
    if (errors) return
    setSignupErrors([])
    setLoading(true)
    signup(creds.login, creds.password)
        .finally(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setSignupErrors(['Не удалось создать аккаунт!'])
          setLoading(false)
        })
  }, [errors, creds])

  return { signupErrors, loading }
}

export default useSignup
