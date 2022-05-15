import { User } from './user'

export interface NewsFields {
  title: string
  description: string
  imgFile: File
}

export interface News {
  id: string
  title: string
  description: string
  url: string
  date: string
  uid: string
  likes?: {
    [key: string]: User
  }
}
