import Header from '@/components/layout/Header'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

export default function HeaderLayout() {
  return (
    <div css={containerStyle}>
      <Header />
      <main css={[mainStyle]}>
        <Outlet />
      </main>
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
