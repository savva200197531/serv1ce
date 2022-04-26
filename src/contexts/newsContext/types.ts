import { News, NewsFields } from '../../types/news'

export type UploadNews = (payload: NewsFields) => Promise<any>

export type DeleteNews = (payload: News) => Promise<any>

export type RateNewsAction = (payload: News) => any

export interface NewsContextProps {
  uploadNews: UploadNews
  loading: boolean
  news: News[]
  deleteNews: DeleteNews
  rateNews: RateNewsAction
}
