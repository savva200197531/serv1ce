import { CommentFields, Comments } from '../../types/comments'

export type UploadComment = (payload: CommentFields) => Promise<any>

export interface CommentsContextProps {
  loading: boolean
  uploadComment: UploadComment
  comments: Comments
}
