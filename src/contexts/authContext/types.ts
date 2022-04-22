import { User } from '../../types/user'

export type AuthAction = (login: string, password: string) => Promise<any>

export type AuthContextProps = {
  signup: AuthAction
  login: AuthAction
  logout: () => Promise<void>
  user: User
  loading: boolean
};
