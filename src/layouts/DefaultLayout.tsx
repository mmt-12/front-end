import { Outlet } from 'react-router-dom'

import Header from '@/components/layout/Header'
import NavBar from '@/components/layout/NavBar'
import { mainStyle } from '@/styles/layout'
import PageTransition from '@/components/animation/PageTransition'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main css={mainStyle} className='no-scrollbar'>
        <PageTransition mode='fade'>
          <Outlet />
        </PageTransition>
        <div css={{ height: '56px', flexShrink: 0 }} />
      </main>
      <NavBar />
    </>
  )
}
