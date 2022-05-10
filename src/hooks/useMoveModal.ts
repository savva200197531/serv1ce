import { useEffect } from 'react'

type UseMoveModal = (open: boolean, ref: any, deps: any[]) => void

const useMoveModal: UseMoveModal = (open, ref, deps) => {
  useEffect(() => {
    setTimeout(() => {
      if (open && ref.current) {
        ref.current.style.marginTop = `calc(50vh - (${ref.current.clientHeight}px / 2))`
        ref.current.style.opacity = '1'
      }
    }, 20)
  }, [open, ref.current, ...deps])
}

export default useMoveModal
