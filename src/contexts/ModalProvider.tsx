import { createContext, useState, type ReactNode } from 'react'
import { css } from '@emotion/react'
import { createPortal } from 'react-dom'

import type { IBaseInput } from '@/types'

type Modal = {
  content: ReactNode
  promiseResolver: (_value: ModalReturnType) => void
}

type ModalReturnType = void | null | IBaseInput | string

interface ModalContextType {
  openModal: (_content: ReactNode) => Promise<ModalReturnType>
  closeModal: (_value: ModalReturnType) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([])

  const openModal = async (content: ReactNode) => {
    return new Promise<ModalReturnType>(resolve => {
      setModals(prev => [...prev, { content, promiseResolver: resolve }])
    })
  }

  const closeModal = (value: ModalReturnType) => {
    setModals(prev => {
      const topModal = prev[prev.length - 1]
      topModal.promiseResolver(value)
      return prev.slice(0, -1)
    })
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalRenderer modals={modals} closeModal={closeModal} />
    </ModalContext.Provider>
  )
}

function ModalRenderer({
  modals,
  closeModal,
}: {
  modals: Modal[]
  closeModal: (_value: ModalReturnType) => void
}) {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot || !modals.length) return null
  const topModal = modals[modals.length - 1]

  return createPortal(
    <div
      css={backgroundStyle}
      onClick={() => closeModal(null)}
      data-testid='modal-background'
    >
      {topModal.content}
    </div>,
    modalRoot,
  )
}
export { ModalProvider, ModalContext }

const backgroundStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  zIndex: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
})
