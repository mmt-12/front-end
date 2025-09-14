import { css, type Theme } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import { ModalProvider } from '@/contexts/ModalProvider'

export default function RootLayout() {
  return (
    <ModalProvider>
      <div css={layoutContainerStyle}>
        <Outlet />
      </div>
    </ModalProvider>
  )
}

const layoutContainerStyle = (theme: Theme) =>
  css({
    height: '100vh',
    backgroundColor: theme.colors.bg,
    overflowY: 'hidden',
  })
