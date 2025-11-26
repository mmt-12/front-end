import { useRef } from 'react'
import { css } from '@emotion/react'
import { Outlet, useBlocker, useNavigate } from 'react-router-dom'
import { ModalProvider as MP, useModal } from 'sam-react-modal'

export default function RootLayout() {
  return (
    <ModalProvider>
      <div css={layoutContainerStyle} className='no-scrollbar'>
        <Outlet />
      </div>
    </ModalProvider>
  )
}

const layoutContainerStyle = css({
  height: '100dvh',
  overflowY: 'hidden',
})

function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <MP
      containerAttributes={{
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
      }}
      backdropAttributes={{
        className: 'fadeIn',
        style: {
          maxWidth: 720,
          margin: '0 auto',
        },
      }}
      modalWrapperAttributes={{
        style: {
          width: '100%',
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      beforeClose={async ref => {
        if (!ref?.current) return
        ref.current.classList.remove('fadeIn')
        ref.current.classList.add('fadeOut')
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 300)
        })
      }}
    >
      <BlockerWrapper>{children}</BlockerWrapper>
    </MP>
  )
}

function BlockerWrapper({ children }: { children: React.ReactNode }) {
  const { closeModal, closeAllModals, modals } = useModal()
  const initialHistoryLength = useRef(window.history.length)
  const navigate = useNavigate()

  useBlocker(({ historyAction, currentLocation }) => {
    if (
      currentLocation.pathname.includes('home') &&
      historyAction === 'POP' &&
      window.history.length !== initialHistoryLength.current
    ) {
      navigate(-(window.history.length - initialHistoryLength.current))
      return true
    }

    if (historyAction === 'PUSH') {
      closeAllModals()
      return false
    }
    if (modals.length === 0) return false
    closeModal()
    return true
  })
  return <>{children}</>
}
