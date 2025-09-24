import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import Header from '@/components/layout/Header'
import NavBar from '@/components/layout/NavBar'
import { fadeIn } from '@/styles/animation'
import { withSafeAreaTop } from '@/styles/common'

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
  height: `calc(100vh - ${withSafeAreaTop(112)})`,
  marginTop: withSafeAreaTop(56),
  marginBottom: withSafeAreaTop(56),
  overflowY: 'scroll',
  overflowX: 'hidden',
})
