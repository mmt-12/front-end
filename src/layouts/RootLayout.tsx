import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import { ModalProvider } from '@/contexts/ModalProvider'

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
  height: '100vh',
  overflowY: 'hidden',
})
