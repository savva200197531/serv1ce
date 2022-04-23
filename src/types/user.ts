export type Creds = {
  login: string
  password: string
  passwordConfirm?: string
}

export type User = {
  email: string
  uid: string
  admin: boolean
}
