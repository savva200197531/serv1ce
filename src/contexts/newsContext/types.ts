import { News, NewsFields } from '../../types/news'

export type UploadNews = (payload: NewsFields) => Promise<any>

export type DeleteNews = (id: string) => Promise<any>

export type RateNewsAction = (payload: News) => void

export interface NewsContextProps {
  uploadNews: UploadNews
  loading: boolean
  news: News[]
  deleteNews: DeleteNews
  rateNews: RateNewsAction
}
