import { ModalProvider } from '@/contexts/ModalProvider'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  )
}
