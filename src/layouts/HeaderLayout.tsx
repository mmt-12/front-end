import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import Header from '@/components/layout/Header'
import { slideInRight } from '@/styles/animation'
import { withSafeAreaTop } from '@/styles/common'

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main css={mainStyle}>
        <PageTransition keyframe={slideInRight}>
          <Outlet />
        </PageTransition>
      </main>
    </>
  )
}

const mainStyle = css({
  height: `calc(100vh - ${withSafeAreaTop(56)})`,
  marginTop: withSafeAreaTop(56),
  overflowY: 'scroll',
})
