export type Order = {
  id: string
  address: string,
  description: string,
  email: string,
  lastName: string,
  material?: string,
  middleName: string,
  name: string,
  phone: string,
  skype?: string,
  terms: string,
  time: string,
  [key: string]: string | undefined
}
