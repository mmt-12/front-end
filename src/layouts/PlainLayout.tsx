import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

export interface ILayoutProps {}

export default function PlainLayout() {
  return (
    <div css={containerStyle}>
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
  height: '100vh',
  overflowY: 'scroll',
})
