<<<<<<< HEAD
import Header from '@/components/common/Header'
import NavBar from '@/components/common/NavBar'
import type { Theme } from '@emotion/react'
=======
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
>>>>>>> 01815eacaf2e912a3f7c9edcafba6f54e3e24038
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

<<<<<<< HEAD
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
=======
const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxWidth: '720px',
  margin: '0 auto',
  backgroundColor: '#f0f0f0',
})

const mainStyle = css({
  height: 'calc(100vh - 112px)', // 56px for header and 56px for NavBar
>>>>>>> 01815eacaf2e912a3f7c9edcafba6f54e3e24038
})
