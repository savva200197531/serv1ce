import { CommentFields } from '../../types/comments'

export type UploadComment = (payload: CommentFields) => Promise<any>

export interface CommentsContextProps {
  uploadComment: UploadComment
}
