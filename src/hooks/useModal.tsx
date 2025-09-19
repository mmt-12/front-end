import { useContext } from 'react'

import { ModalContext } from '@/contexts/ModalProvider'

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return ctx
}
