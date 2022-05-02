export type Creds = {
  name: string
  login: string
  oldPassword?: string
  password: string
  passwordConfirm?: string
}

export type User = {
  name: string
  email: string
  uid: string
  admin: boolean
}
