import Layout from '@/layouts/Layout'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './ROUTES'
import LoginPage from '@/pages/LoginPage'
import MemoryListPage from '@/pages/MemoryListPage'
import MapPage from '@/pages/MapPage'
import CalendarPage from '@/pages/CalendarPage'
import GuestBookPage from '@/pages/GuestBookPage'
import NotificationPage from '@/pages/NotificationPage'
import PlainLayout from '@/layouts/PlainLayout'

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    Component: () => <PlainLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    Component: () => <Layout />,
    children: [
      {
        path: ROUTES.MEMORY_LIST,
        element: <MemoryListPage />,
      },
      {
        path: ROUTES.MAP,
        element: <MapPage />,
      },
      {
        path: ROUTES.CALENDAR,
        element: <CalendarPage />,
      },
      {
        path: ROUTES.GUEST_BOOK,
        element: <GuestBookPage />,
      },
      {
        path: ROUTES.NOTIFICATION,
        element: <NotificationPage />,
      },
    ],
  },
])

export default router
