import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import EditModalForm from './EditModalForm'
import { Button, Modal } from '@mui/material'

const EditNewsModal: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="contained" color="primary" className="news-card-edit" onClick={handleOpen}>
        Добавить новость
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <>
          <EditModalForm open={open} handleClose={handleClose} />
        </>
      </Modal>
    </>
  )
}

export default EditNewsModal
