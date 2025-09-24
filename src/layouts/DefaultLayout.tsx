import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import Header from '@/components/layout/Header'
import NavBar from '@/components/layout/NavBar'
import { fadeIn } from '@/styles/animation'
import { withSafeAreaBottom, withSafeAreaTop } from '@/styles/common'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main css={mainStyle} className='no-scrollbar'>
        <PageTransition keyframe={fadeIn}>
          <Outlet />
        </PageTransition>
      </main>
      <NavBar />
    </>
  )
}

const mainStyle = css({
  height: `calc(100vh - ${withSafeAreaTop(56)} - ${withSafeAreaBottom(56)})`,
  marginTop: withSafeAreaTop(56),
  marginBottom: withSafeAreaBottom(56),
  overflowY: 'scroll',
  overflowX: 'hidden',
})
