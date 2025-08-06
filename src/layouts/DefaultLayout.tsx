import Header from '@/components/common/Header'
import NavBar from '@/components/common/NavBar'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div css={containerStyle}>
      <Header />
      <main css={mainStyle} className='no-scrollbar'>
        <Outlet />
        <div css={{ height: '56px' }}></div>
      </main>
      <NavBar />
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    height: '100vh',
    backgroundColor: theme.bg,
    overflowY: 'hidden',
  })

const mainStyle = css({
  height: 'calc(100vh - 56px)',
  overflowY: 'scroll',
})
