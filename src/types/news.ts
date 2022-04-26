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
  user: User
  likes?: {
    [key: string]: User
  }
}
