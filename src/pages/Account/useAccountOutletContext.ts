import { useOutletContext } from 'react-router-dom'
import { User } from '../../types/user'

const useAccountOutletContext = () => {
  return useOutletContext<{ user: User }>()
}

export default useAccountOutletContext
