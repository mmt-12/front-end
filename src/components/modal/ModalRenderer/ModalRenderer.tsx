import { useEffect, type ReactNode } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { createPortal } from 'react-dom'

import { useModal } from '@/hooks/useModal'
import { fadeIn, fadeOut } from '@/styles/animation'
import type { Modal } from '@/types'

export default function ModalRenderer({ modals }: { modals: Modal[] }) {
  const theme = useTheme()
  const { closeModal } = useModal()
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot || !modals.length) return null
  const topModal = modals[modals.length - 1]
  const content = topModal.content

  return createPortal(
    <div
      css={backgroundStyle(theme, topModal)}
      onClick={() => closeModal(null)}
      data-testid='modal-background'
    >
      <div css={contentStyle(theme, topModal)}>
        <ModalWrapper>{content}</ModalWrapper>
      </div>
    </div>,
    modalRoot,
  )
}

function ModalWrapper({ children }: { children: ReactNode }) {
  const { closeModal } = useModal()
  useEffect(() => {
    if (!closeModal) return

    const onPopState = () => {
      console.log(window.location.href)
      console.log('pop!')
      window.history.pushState({ modal: true }, '', window.location.href)
      closeModal(null, { withoutRoute: true })
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [closeModal])
  return <>{children}</>
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
