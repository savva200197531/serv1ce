export type Creds = {
  login: string
  oldPassword?: string
  password: string
  passwordConfirm?: string
}

export type User = {
  email: string
  uid: string
  admin: boolean
}
