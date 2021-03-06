import React, { FormEvent, useState } from 'react'
import { Avatar, Button, FormControl, IconButton, OutlinedInput } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { News } from '../../../types/news'
import { useFocus } from '../../../hooks/useFocus'
import { useComments } from '../../../contexts/commentsContext/CommentsContext'
import Loader from 'react-ts-loaders'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { useNews } from '../../../contexts/newsContext/NewsContext'
import { useUsers } from '../../../contexts/usersContext/UsersContext'

type Props = {
  item: News
}

const NewsBottom: React.FC<Props> = ({ item }) => {
  const [comment, setComment] = useState<string>('')

  const [inputRef, setInputFocus] = useFocus()
  const { uploadComment, comments: allComments, loading } = useComments()
  const { rateNews } = useNews()
  const { user, isAuth } = useAuth()
  const { users } = useUsers()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!comment.length) return
    setComment('')
    uploadComment({
      comment,
      id: item.id,
    }).finally(() => {
    })
  }

  const comments = allComments[item.id] || []

  return (
    <div className="news-bottom">
      <div className="news-actions">
        <Button disabled={!isAuth} onClick={() => rateNews(item)} variant="contained" color="inherit">
          <FontAwesomeIcon color={item.likes && item.likes[user.uid] ? '#d32f2f' : ''} className="news-actions__like" icon={faHeart as any} size="sm"/>
          <span className="news-action-counter">{!!item.likes && Object.values(item.likes).length}</span>
        </Button>

        <Button disabled={!isAuth} onClick={setInputFocus} variant="contained" color="inherit">
          <FontAwesomeIcon className="news-actions__comment" icon={faComment as any} size="sm"/>
          <span className="news-action-counter">{!!comments.length && comments.length}</span>
        </Button>
      </div>

      <div className="news-comments">
        {
          loading ?
            <Loader type="dualring" size={20}/> :
            comments.map(({ text, id, date, uid }) => (
              <div className="news-comment" key={id}>
                <Avatar src={users[uid]?.avatar}></Avatar>
                <div className="news-comment-right">
                  <p className="news-comment-user">{users[uid]?.name || '????????????'}</p>
                  <p className="news-comment-text">{text}</p>
                  <p className="time">{date}</p>
                </div>
              </div>
            ))
        }
      </div>

      <form className="news-comments-form" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <OutlinedInput
            sx={{ height: 40 }}
            inputRef={inputRef}
            color="primary"
            placeholder="???????????????? ??????????????????????..."
            id="comment"
            disabled={!isAuth}
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

export default NewsBottom
