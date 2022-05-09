import React, { useState } from 'react'
import NewsForm from './NewsForm'
import { Button, Modal } from '@mui/material'

const NewsModal: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="add-form-modal">
      <Button variant="contained" color="primary" className="add-btn" onClick={handleOpen}>
        Добавить новость
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <>
          <NewsForm open={open} handleClose={handleClose} />
        </>
      </Modal>
    </div>
  )
}

export default NewsModal
