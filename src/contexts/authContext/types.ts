export type AuthAction = (login: string, password: string) => Promise<any>

export type AuthContextProps = {
  signup: AuthAction
  login: AuthAction
  logout: () => Promise<void>
  user: User
  loading: boolean
};

export type User = {
  email: string | null
  uid: string
  admin: boolean
}
