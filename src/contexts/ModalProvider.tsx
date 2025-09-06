import { createContext, useState, type ReactNode } from 'react'
import { css, type Keyframes } from '@emotion/react'
import { createPortal } from 'react-dom'

import { fadeIn, fadeOut } from '@/styles/animation'
import type { IBaseInput } from '@/types'

type Modal = {
  content: ReactNode
  promiseResolver: (_value: ModalReturnType) => void
  isClosing?: boolean
  closingKeyframe: Keyframes
}

type ModalReturnType = void | null | IBaseInput | string

interface ModalContextType {
  openModal: (
    _content: ReactNode,
    _closingKeyframe?: Keyframes,
  ) => Promise<ModalReturnType>
  closeModal: (_value: ModalReturnType) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([])

  const openModal = async (
    content: ReactNode,
    closingKeyframe: Keyframes = fadeOut,
  ) => {
    return new Promise<ModalReturnType>(resolve => {
      setModals(prev => [
        ...prev,
        { content, promiseResolver: resolve, closingKeyframe },
      ])
    })
  }

  const closeModal = (value: ModalReturnType) => {
    setModals(prev => {
      if (!prev.length) return prev
      const next = [...prev]
      next[next.length - 1] = { ...next[next.length - 1], isClosing: true }
      return next
    })

    setTimeout(() => {
      setModals(prev => {
        if (!prev.length) return prev
        const next = [...prev]
        const top = next[next.length - 1]
        if (top) top.promiseResolver(value)
        return next.slice(0, -1)
      })
    }, 160)
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

  const content = topModal.content

  return createPortal(
    <div
      css={backgroundStyle(topModal)}
      onClick={() => closeModal(null)}
      data-testid='modal-background'
    >
      {content}
    </div>,
    modalRoot,
  )
}
export { ModalProvider, ModalContext }

const backgroundStyle = (modal: Modal) =>
  css({
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
    animation: modal.isClosing
      ? `${modal.closingKeyframe} 160ms ease-in`
      : `${fadeIn} 160ms ease-out`,
  })
