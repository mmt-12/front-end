import NavBar from '@/components/layout/NavBar'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

export default function NavBarLayout() {
  return (
    <div css={containerStyle}>
      <main css={[mainStyle]}>
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
