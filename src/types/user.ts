export type Creds = {
  login: string
  password: string
  passwordConfirm?: string
}

export type SignupField = {
  id: string
  name: string
  setState: (value: string) => void
  errors: string[]
}
