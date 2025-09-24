import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import { fadeIn } from '@/styles/animation'

export default function PlainLayout() {
  return (
    <>
      <PageTransition keyframe={fadeIn}>
        <Outlet />
      </PageTransition>
    </>
  )
}
