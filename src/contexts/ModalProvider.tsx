import { createContext, useCallback, useState, type ReactNode } from 'react'
import { useTheme, type Keyframes } from '@emotion/react'

import Alert from '@/components/modal/Alert'
import Confirm from '@/components/modal/Confirm'
import ModalRenderer from '@/components/modal/ModalRenderer'
import { fadeOut, slideDown } from '@/styles/animation'
import type { Modal, ModalReturnType } from '@/types'

interface ModalContextType {
  openModal: (
    _content: ReactNode,
    _closingKeyframe?: Keyframes,
  ) => Promise<ModalReturnType>
  closeModal: (
    _value: ModalReturnType,
    _options?: { withoutRoute?: boolean },
  ) => Promise<void>
  confirm: (_message: string) => Promise<ModalReturnType>
  alert: (_message: string) => Promise<ModalReturnType>
}

const ModalContext = createContext<ModalContextType | null>(null)

function ModalProvider({ children }: { children: ReactNode }) {
  const theme = useTheme()
  const [modals, setModals] = useState<Modal[]>([])

  const openModal = useCallback(
    async (content: ReactNode, closingKeyframe: Keyframes = fadeOut) => {
      return new Promise<ModalReturnType>(resolve => {
        setModals(prev => [
          ...prev,
          { content, promiseResolver: resolve, closingKeyframe },
        ])
      })
    },
    [],
  )

  const closeModal = useCallback(async () => {
    setModals(prev => prev.slice(0, -1))
  }, [])

  const confirm = async (message: string) => {
    return openModal(<Confirm>{message}</Confirm>, slideDown)
  }

  const alert = async (message: string) => {
    return openModal(<Alert>{message}</Alert>, slideDown)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, confirm, alert }}>
      {children}
      <ModalRenderer modals={modals} />
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
