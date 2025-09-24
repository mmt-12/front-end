import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import NavBar from '@/components/layout/NavBar'
import { withSafeAreaTop } from '@/styles/common'

export default function NavBarLayout() {
  return (
    <>
      <main css={mainStyle}>
        <Outlet />
      </main>
      <NavBar />
    </>
  )
}

const mainStyle = css({
  height: `calc(100vh - ${withSafeAreaTop(56)})`,
  marginBottom: withSafeAreaTop(56),
  overflowY: 'scroll',
})
