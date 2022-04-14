import React from 'react'
import './not-found.scss'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <p>error 404</p>
      <Button color="primary" variant="contained" onClick={() => navigate(-1)}>
        Назад
      </Button>
    </div>
  )
}

export default NotFound
