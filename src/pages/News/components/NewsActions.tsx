import React, { FormEvent, useEffect, useState } from 'react'
import { FormControl, IconButton, OutlinedInput } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { News } from '../../../types/news'
import { useFocus } from '../../../hooks/useFocus'
import { useComments } from '../../../contexts/commentsContext/CommentsContext'
import Loader from 'react-ts-loaders'

type Props = {
  item: News
}

const NewsActions: React.FC<Props> = ({ item: { id } }) => {
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState<string>('')

  const [inputRef, setInputFocus] = useFocus()
  const { uploadComment, comments, loading } = useComments()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!comment.length) return
    setComment('')
    uploadComment({
      comment,
      id,
    }).finally(() => {
    })
  }

  useEffect(() => {
    console.log(comments[id])
  }, [comments])

  return (
    <div className="news-actions">
      {
        loading ?
          <Loader type="dualring" size={20}/> :
          <div>
            {comments[id]?.map(({ text, id, user, date }) => (
              <div key={id}>{text}</div>
            ))}
          </div>
      }

      <IconButton color="error">
        <FontAwesomeIcon className="news-actions__like" icon={faHeart as any} size="sm"/>
      </IconButton>
      <IconButton onClick={setInputFocus} color="inherit">
        <FontAwesomeIcon className="news-actions__comment" icon={faComment as any} size="sm"/>
      </IconButton>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <OutlinedInput
            inputRef={inputRef}
            color="primary"
            placeholder="Написать комментарий..."
            id="comment"
            fullWidth
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </FormControl>

        <IconButton disabled={!comment.length} type="submit" color="inherit">
          <FontAwesomeIcon className="news-actions__comment" icon={faPaperPlane as any} size="sm"/>
        </IconButton>
      </form>
    </div>
  )
}

export default NewsActions
