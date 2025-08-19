import Header from '@/components/layout/Header'
import NavBar from '@/components/layout/NavBar'
import { mainStyle } from '@/styles/layout'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main css={mainStyle} className='no-scrollbar'>
        <Outlet />
        <div css={{ height: '56px' }}></div>
      </main>
      <NavBar />
    </>
  )
}
