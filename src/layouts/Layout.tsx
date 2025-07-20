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

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxWidth: '720px',
  margin: '0 auto',
  backgroundColor: '#f0f0f0',
})

const mainStyle = (theme: Theme) =>
  css({
    height: 'calc(100vh - 112px)', // 56px for header and 56px for NavBar
  })
