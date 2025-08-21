import Header from '@/components/layout/Header'
import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main css={[mainStyle]}>
        <Outlet />
      </main>
    </>
  )
}
const mainStyle = css({
  height: 'calc(100vh - 56px)',
  overflowY: 'scroll',
})
