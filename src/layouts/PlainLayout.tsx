import { mainStyle } from '@/styles/layout'
import { Outlet } from 'react-router-dom'

export default function PlainLayout() {
  return (
    <>
      <main css={[mainStyle, { height: '100vh' }]}>
        <Outlet />
      </main>
    </>
  )
}
