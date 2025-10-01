import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import Header from '@/components/layout/Header'
import { slideInRight } from '@/styles/animation'
import { withSafeAreaBottom, withSafeAreaTop } from '@/styles/common'

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main css={mainStyle}>
        <PageTransition keyframe={slideInRight}>
          <Outlet />
          <div css={{ height: withSafeAreaBottom(0), flexShrink: 0 }} />
        </PageTransition>
      </main>
    </>
  )
}

const mainStyle = css({
  height: `calc(100dvh - ${withSafeAreaTop(56)})`,
  marginTop: withSafeAreaTop(56),
  overflowY: 'scroll',
})
