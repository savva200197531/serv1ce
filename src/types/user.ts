export type Creds = {
  login: string
  password: string
  passwordConfirm?: string
}

export interface User {
  email: string
  uid: string
  admin?: boolean
  name?: string
  avatar?: string
}

export type UserData = {
  name: string
  imgFile?: File
}

export type PasswordData = {
  // oldPassword: string
  password: string
  passwordConfirm: string
}

export type Users = {
  [key: string]: User
}
