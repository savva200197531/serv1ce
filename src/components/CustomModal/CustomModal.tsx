import React, { ReactElement, useEffect, useRef } from 'react'
import './custom-modal.scss'
import { Modal } from '@mui/material'

type Props = {
  onClose: (value: boolean) => void
  open: boolean
  children: ReactElement
}

const CustomModal: React.FC<Props> = ({ onClose, open, children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (open && ref.current) {
        ref.current.style.marginTop = `calc(40vh - (${ref.current.clientHeight}px / 2))`
        ref.current.style.opacity = '1'
      }
    })
  }, [open, ref.current])

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="custom-modal" ref={ref}>
        {children}
      </div>
    </Modal>
  )
}

export default CustomModal
