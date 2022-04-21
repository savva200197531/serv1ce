import React, { FormEvent, useState } from 'react'
import { FormControl, FormHelperText, IconButton, Input, InputLabel, OutlinedInput } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { News } from '../../../types/news'
import { useFocus } from '../../../hooks/useFocus'

type Props = {
  item: News
}

const NewsActions: React.FC<Props> = ({ item }) => {
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState<string>('')

  const [inputRef, setInputFocus] = useFocus()


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(comment)
  }

  return (
    <div className="news-actions">
      <IconButton color="error">
        <FontAwesomeIcon className="news-actions__like" icon={faHeart as any} size="sm" />
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
