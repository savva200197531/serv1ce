import { News, NewsFields } from '../../types/news'

export type UploadNews = (value: NewsFields) => Promise<any>

export type DeleteNews = (value: News) => Promise<any>

export type UploadComment = (payload: any) => Promise<any>

export interface NewsContextProps {
  uploadNews: UploadNews
  loading: boolean
  news: News[]
  deleteNews: DeleteNews
}
