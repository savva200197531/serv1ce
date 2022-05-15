export type CommentFields = {
  id: string
  comment: string
}

export type Comments = {
  [key: string]: Comment[]
}

export type Comment = {
  id: string
  text: string
  date: string
  uid: string
}
