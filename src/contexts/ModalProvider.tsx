import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { css, type Keyframes } from '@emotion/react'
import { createPortal } from 'react-dom'

import Alert from '@/components/modal/Alert'
import Confirm from '@/components/modal/Confirm'
import { useModal } from '@/hooks/useModal'
import { fadeIn, fadeOut, slideDown } from '@/styles/animation'
import type { IBaseInput } from '@/types'

const FG_DURATION = 140
const BG_DURATION = 320

type Modal = {
  content: ReactNode
  promiseResolver: (_value: ModalReturnType) => void
  isClosing?: boolean
  closingKeyframe: Keyframes
}

type ModalReturnType = void | null | IBaseInput | string | boolean

interface ModalContextType {
  openModal: (
    _content: ReactNode,
    _closingKeyframe?: Keyframes,
  ) => Promise<ModalReturnType>
  closeModal: (
    _value: ModalReturnType,
    _options?: { skipBack: boolean },
  ) => Promise<void>
  confirm: (_message: string) => Promise<ModalReturnType>
  alert: (_message: string) => Promise<ModalReturnType>
}

const ModalContext = createContext<ModalContextType | null>(null)

function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([])

  const openModal = useCallback(
    async (content: ReactNode, closingKeyframe: Keyframes = fadeOut) => {
      window.history.pushState(null, '', window.location.href + '#')
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
    async (value: ModalReturnType, options?: { skipBack?: boolean }) => {
      if (!options?.skipBack) {
        window.history.back()
      }

      setModals(prev => {
        if (!prev.length) return prev
        const next = [...prev]
        next[next.length - 1] = { ...next[next.length - 1], isClosing: true }
        return next
      })

      return new Promise<void>(resolve => {
        setTimeout(() => {
          setModals(prev => {
            if (!prev.length) return prev
            const next = [...prev]
            const top = next[next.length - 1]
            if (top) top.promiseResolver(value)
            return next.slice(0, -1)
          })
          resolve()
        }, FG_DURATION)
      })
    },
    [],
  )

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

function ModalRenderer({ modals }: { modals: Modal[] }) {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot || !modals.length) return null
  const topModal = modals[modals.length - 1]
  const content = topModal.content

  return createPortal(
    <div
      css={backgroundStyle(topModal)}
      onClick={() => window.history.back()}
      data-testid='modal-background'
    >
      <div css={contentStyle(topModal)}>
        <ModalWrapper>{content}</ModalWrapper>
      </div>
    </div>,
    modalRoot,
  )
}

export { ModalProvider, ModalContext }

function ModalWrapper({ children }: { children: ReactNode }) {
  const { closeModal } = useModal()
  useEffect(() => {
    if (!closeModal) return

    const onPopState = () => {
      closeModal(null, { skipBack: true })
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [closeModal])
  return <>{children}</>
}

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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    animation: modal.isClosing
      ? `${fadeOut} ${FG_DURATION}ms ease-in`
      : `${fadeIn} ${BG_DURATION}ms ease-out`,
  })

const contentStyle = (modal: Modal) =>
  css({
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: modal.isClosing
      ? `${modal.closingKeyframe} ${FG_DURATION}ms ease-in`
      : '',
  })
