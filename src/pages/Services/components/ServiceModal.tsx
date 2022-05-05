import React, { useState } from 'react'
import AddServiceForm from './AddServiceForm'
import { Button, Modal } from '@mui/material'

const ServiceModal: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="contained" color="primary" className="edit-news-btn" onClick={handleOpen}>
        Добавить новость
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <>
          <AddServiceForm open={open} handleClose={handleClose} />
        </>
      </Modal>
    </>
  )
}

export default ServiceModal
