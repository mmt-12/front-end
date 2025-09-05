import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import { mainStyle } from '@/styles/layout'

export default function PlainLayout() {
  return (
    <>
      <main css={[mainStyle, { height: '100vh' }]}>
        <PageTransition mode='fade'>
          <Outlet />
        </PageTransition>
      </main>
    </>
  )
}
