export type Creds = {
  login: string
  password: string
  passwordConfirm?: string
}

export type AuthField = {
  id: string
  name: string
  setState: (value: string) => void
  errors: string[]
}
