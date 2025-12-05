import { css } from '@emotion/react'
import { Outlet, useBlocker } from 'react-router-dom'
import { ModalProvider, useModal } from 'sam-react-modal'

export default function RootLayout() {
  return (
    <ModalProviderWrapper>
      <div css={layoutContainerStyle} className='no-scrollbar'>
        <Outlet />
      </div>
    </ModalProviderWrapper>
  )
}

const layoutContainerStyle = css({
  height: '100dvh',
  overflowY: 'hidden',
})

function ModalProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider
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
    </ModalProvider>
  )
}

function BlockerWrapper({ children }: { children: React.ReactNode }) {
  const { closeModal, closeAllModals, modals } = useModal()

  useBlocker(({ historyAction }) => {
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
