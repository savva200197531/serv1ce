export type AuthAction = (login: string, password: string) => Promise<void>

export type TodoContextProps = {
  signup: AuthAction
  login: AuthAction
  logout: () => Promise<void>
  user: User
  loading: boolean
};

export type AuthState = {};

export type User = {
  email: string | null
  uid: string
}
