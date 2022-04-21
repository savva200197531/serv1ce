import { RefObject, useRef } from 'react'

type UseFocus = () => [RefObject<HTMLElement>, () => void]

export const useFocus: UseFocus = () => {
  const htmlElRef = useRef<HTMLElement>(null)
  const setFocus = () => htmlElRef.current && htmlElRef.current.focus()

  return [htmlElRef, setFocus]
}
