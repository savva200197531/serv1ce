export type Creds = {
  name: string
  login: string
  password: string
  passwordConfirm?: string
}

export type User = {
  name: string
  email: string
  uid: string
  admin?: boolean
  avatar: string | null
}

export type UserData = {
  name: string
  imgFile: File
}

export type PasswordData = {
  oldPassword: string
  password: string
  passwordConfirm: string
}
