import { useState, useEffect } from 'react'
import { Creds } from '../types/user'
import { useAuth } from '../contexts/authContext/AuthContext'

type UseChangeCreds = (creds: Creds, errors: boolean) => ({
  changeCredsErrors: string[]
  loading: boolean
})

// отпрвляю данные в контекст и если есть ошибка, выставляю ее
const useChangeCreds: UseChangeCreds = (creds, errors) => {
  // state
  const [changeCredsErrors, setChangeCredsErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  // const { login } = useAuth()

  useEffect(() => {
    if (errors) return
    setChangeCredsErrors([])
    // setLoading(true)
    console.log(creds)
    // login(creds.login, creds.password)
    //     .finally(() => {
    //       setLoading(false)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       setChangeCredsErrors(['Не удалось войти в аккаунт!'])
    //     })
  }, [creds, errors])

  return { changeCredsErrors, loading }
}

export default useChangeCreds
