import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import Header from '@/components/layout/Header'

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main css={[mainStyle]}>
        <PageTransition mode='slide'>
          <Outlet />
        </PageTransition>
      </main>
    </>
  )
}
const mainStyle = css({
  height: 'calc(100vh - 56px)',
  overflowY: 'scroll',
})
