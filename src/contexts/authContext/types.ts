import { Creds, User, UserData } from '../../types/user'
import { User as FirebaseUser } from 'firebase/auth'

export type AuthAction = (creds: Creds) => Promise<any>

export type ChangeUserData = (payload: UserData) => Promise<any>

export type ChangePassword = (password: string) => Promise<any>

export type UpdateProfile = (user: FirebaseUser, payload: {
  displayName?: string
  photoURL?: string
}) => Promise<any>

export type GetUser = (payload: User) => void

export type AuthContextProps = {
  signup: AuthAction
  login: AuthAction
  logout: () => Promise<void>
  user: User
  loading: boolean
  changeUserData: ChangeUserData
  changePassword: ChangePassword
  isAuth: boolean
};
