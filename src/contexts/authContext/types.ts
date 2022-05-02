import { Creds, User } from '../../types/user'

export type AuthAction = (creds: Creds) => Promise<any>

export type GetUser = (payload: {
  uid: string,
  email: string,
  name: string
}) => void

export type AuthContextProps = {
  signup: AuthAction
  login: AuthAction
  logout: () => Promise<void>
  user: User
  loading: boolean
};
