import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/authContext/AuthContext'
import { Creds } from '../types/user'

const useSignup = (creds: Creds, errors: boolean) => {
  // state
  const [signupErrors, setSignupErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  // other
  const { signup } = useAuth()

  useEffect(() => {
    if (errors) return
    setSignup().catch((error) => console.log(error))
  }, [errors, creds])

  const setSignup = async () => {
    setSignupErrors([])
    try {
      setLoading(true)
      await signup(creds.login, creds.password)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      setSignupErrors(['Не удалось создать аккаунт!'])
      setLoading(false)
    }
  }

  return { signupErrors, loading }
}

export default useSignup
