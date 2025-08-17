// contexts/ModalProvider.tsx
import { css } from '@emotion/react'
import { createContext, Fragment, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Modal = { id: string; content: ReactNode }

interface ModalContextType {
  openModal: (_id: string, _content: ReactNode) => void
  closeModal: (_id: string) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([])

  const openModal = (id: string, content: ReactNode) =>
    setModals(prev => [...prev, { id, content }])

  const closeModal = (id: string) => {
    setModals(prev => prev.filter(m => m.id !== id))
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
  closeModal: (_id: string) => void
}) {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot || !modals.length) return null
  const topModal = modals[modals.length - 1]

  return createPortal(
    <div
      css={backgroundStyle}
      onClick={() => closeModal(topModal.id)}
      data-testid='modal-background'
    >
      {modals.map(({ id, content }) => (
        <Fragment key={id}>{content}</Fragment>
      ))}
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
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
})
