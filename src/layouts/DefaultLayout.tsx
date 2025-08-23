import { Outlet } from 'react-router-dom'

import Header from '@/components/layout/Header'
import NavBar from '@/components/layout/NavBar'
import { mainStyle } from '@/styles/layout'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main css={mainStyle} className='no-scrollbar'>
        <Outlet />
        <div css={{ height: '56px', flexShrink: 0 }} />
      </main>
      <NavBar />
    </>
  )
}
