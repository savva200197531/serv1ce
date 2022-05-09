import React, { useState } from 'react'
import ServiceForm from './ServiceForm'
import { Button, Modal } from '@mui/material'

const ServiceModal: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="add-form-modal">
      <Button variant="contained" color="primary" className="add-btn" onClick={handleOpen}>
        Добавить услугу
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <>
          <ServiceForm open={open} handleClose={handleClose} />
        </>
      </Modal>
    </div>
  )
}

export default ServiceModal
