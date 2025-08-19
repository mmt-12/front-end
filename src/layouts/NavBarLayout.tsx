import NavBar from '@/components/layout/NavBar'
import { mainStyle } from '@/styles/layout'
import { Outlet } from 'react-router-dom'

export default function NavBarLayout() {
  return (
    <>
      <main css={[mainStyle]}>
        <Outlet />
        <div css={{ height: '56px' }}></div>
      </main>
      <NavBar />
    </>
  )
}
