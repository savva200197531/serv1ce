export type AuthAction = (login: string, password: string) => Promise<void>

export type TodoContextProps = {
  signup: AuthAction
  login: AuthAction
  logout: () => Promise<void>
};

export type AuthState = {};
