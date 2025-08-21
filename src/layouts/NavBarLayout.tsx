import { Outlet } from 'react-router-dom'

import NavBar from '@/components/layout/NavBar'
import { mainStyle } from '@/styles/layout'

export default function NavBarLayout() {
  return (
    <>
      <main css={[mainStyle]}>
        <Outlet />
        <div css={{ height: '56px', flexShrink: 0 }}></div>
      </main>
      <NavBar />
    </>
  )
}
