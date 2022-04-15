import { News, NewsFields } from '../../types/news'

export type UploadNews = (value: NewsFields) => Promise<any>

export type DeleteNews = (value: News) => void

export interface NewsContextProps {
  uploadNews: UploadNews
  loading: boolean
  news: News[]
  deleteNews: DeleteNews
}
