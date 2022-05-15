import React, { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Props = {
  success: boolean
}

const ServiceDialog: React.FC<Props> = ({ success }) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    success && setOpen(true)
  }, [success])

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Спасибо за заявку
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          С вами свяжется наш менеджер в указанное вами время.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => navigate('/services')}>Оформить ещё</Button>
        <Button variant="contained" onClick={() => navigate('/')} autoFocus>
          На главную
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ServiceDialog
