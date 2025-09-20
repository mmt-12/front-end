import { createContext, useCallback, useState, type ReactNode } from 'react'
import { css, useTheme, type Keyframes, type Theme } from '@emotion/react'
import { createPortal } from 'react-dom'
import { useBlocker } from 'react-router-dom'

import Alert from '@/components/modal/Alert'
import Confirm from '@/components/modal/Confirm'
import { useModal } from '@/hooks/useModal'
import { fadeIn, fadeOut, slideDown } from '@/styles/animation'
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
  closeAllModals: () => Promise<void>
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

  const closeModal = useCallback(
    async (value: ModalReturnType) => {
      setModals(prev => {
        if (!prev.length) return prev
        const next = [...prev]
        next[next.length - 1] = {
          ...next[next.length - 1],
          isClosing: true,
        }
        return next
      })

      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
          setModals(prev => {
            if (!prev.length) return prev
            prev[prev.length - 1].promiseResolver(value)
            return prev.slice(0, -1)
          })
        }, theme.transition.duration.fg)
      })
    },
    [theme.transition.duration.fg],
  )

  const closeAllModals = useCallback(async () => {
    setModals([])
  }, [])

  const confirm = async (message: string) => {
    return openModal(<Confirm>{message}</Confirm>, slideDown)
  }

  const alert = async (message: string) => {
    return openModal(<Alert>{message}</Alert>, slideDown)
  }

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, confirm, alert, closeAllModals }}
    >
      {children}
      <ModalRenderer modals={modals} />
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }

function ModalRenderer({ modals }: { modals: Modal[] }) {
  const theme = useTheme()
  const { closeModal, closeAllModals } = useModal()
  useBlocker(({ historyAction }) => {
    if (historyAction === 'PUSH') {
      closeAllModals()
      return false
    }
    if (modals.length == 0) return false
    closeModal()
    return true
  })

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot || !modals.length) return null
  const topModal = modals[modals.length - 1]
  const content = topModal.content

  return createPortal(
    <div
      css={backgroundStyle(theme, topModal)}
      onClick={() => closeModal()}
      data-testid='modal-background'
    >
      <div css={contentStyle(theme, topModal)}>{content}</div>
    </div>,
    modalRoot,
  )
}

const backgroundStyle = (theme: Theme, modal: Modal) =>
  css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    animation: modal.isClosing
      ? `${fadeOut} ${theme.transition.duration.fg}ms ease-in`
      : `${fadeIn} ${theme.transition.duration.bg}ms ease-out`,
  })

const contentStyle = (theme: Theme, modal: Modal) =>
  css({
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: modal.isClosing
      ? `${modal.closingKeyframe} ${theme.transition.duration.fg}ms ease-in`
      : '',
  })
