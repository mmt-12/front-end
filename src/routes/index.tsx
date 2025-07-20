import Layout from '@/layouts/Layout'
import { HomePage } from '@/pages/HomePage'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './ROUTES'
import MemoryListPage from '@/pages/MemoryListPage'
import MapPage from '@/pages/MapPage'
import CalendarPage from '@/pages/CalendarPage'
import GuestBookPage from '@/pages/GuestBookPage'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: () => <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
    ],
  },
])

export default router
