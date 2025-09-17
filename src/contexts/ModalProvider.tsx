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
      window.history.replaceState({ modal: true }, '')
      window.history.pushState({ modal: true }, '', window.location.href + '#')
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
    async (value: ModalReturnType, options?: { withoutRoute?: boolean }) => {
      if (!options?.withoutRoute) {
        if (value) {
          setModals(prev => {
            if (!prev.length) return prev
            const next = [...prev]
            next[next.length - 1] = {
              ...next[next.length - 1],
              returnValue: value,
            }
            return next
          })
        }
        window.history.back() // return value를 잃어버림
        return
      }
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
          setModals(prev => {
            if (!prev.length) return prev
            const next = [...prev]
            const top = next[next.length - 1]
            if (top) {
              top.promiseResolver(top.returnValue)
            }
            return next.slice(0, -1)
          })
          resolve()
        }, theme.transition.duration.fg)
      })
    },
    [theme.transition.duration.fg],
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

export { ModalProvider, ModalContext }
