import Layout from '@/layouts/Layout'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from './ROUTES'
import LoginPage from '@/pages/LoginPage'
import MemoryListPage from '@/pages/MemoryListPage'
import MapPage from '@/pages/MapPage'
import CalendarPage from '@/pages/CalendarPage'
import GuestBookPage from '@/pages/GuestBookPage'
import NotificationPage from '@/pages/NotificationPage'
import PlainLayout from '@/layouts/PlainLayout'
import SignupPage from '@/pages/SignupPage'
import NavbarLayout from '@/layouts/NavbarLayout'
import MemoryDetailPage from '@/pages/MemoryDetailPage'

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    Component: () => <PlainLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
    ],
  },
  {
    path: ROUTES.MEMORY_DETAIL(':id'),
    Component: () => <NavbarLayout />,
    children: [
      {
        index: true,
        element: <MemoryDetailPage />,
      },
    ],
  },
  {
    path: '/',
    Component: () => <Layout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.MEMORY_LIST} replace /> },
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
