import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

export interface ILayoutProps {}

export default function Layout() {
  return (
    <div css={containerStyle}>
      <Header />
      <main css={[mainStyle]}>
        <Outlet />
      </main>
      <NavBar />
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    maxWidth: theme.maxWidth,
    margin: '0 auto',
    backgroundColor: theme.bg,
  })

const mainStyle = css({
  height: 'calc(100vh - 56px)',
})
