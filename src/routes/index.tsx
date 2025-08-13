import PlainLayout from '@/layouts/PlainLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import HeaderLayout from '@/layouts/HeaderLayout'
import NavBarLayout from '@/layouts/NavBarLayout'

import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from './ROUTES'

import LoginPage from '@/pages/LoginPage'
import MemoryListPage from '@/pages/MemoryListPage'
import MapPage from '@/pages/MapPage'
import CalendarPage from '@/pages/CalendarPage'
import GuestBookPage from '@/pages/GuestBookPage'
import NotificationPage from '@/pages/NotificationPage'
import SignupPage from '@/pages/SignupPage'
import MemoryDetailPage from '@/pages/MemoryDetailPage'
import EditProfilePage from '@/pages/EditProfilePage'
import AddProfileImagePage from '@/pages/AddProfileImagePage'
import PostDetailPage from '@/pages/PostDetailPage'
import { ErrorBoundary } from '@/pages/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    Component: () => <PlainLayout />,
    errorElement: <ErrorBoundary />,
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
    Component: () => <NavBarLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <MemoryDetailPage />,
      },
    ],
  },
  {
    path: '/',
    Component: () => <DefaultLayout />,
    errorElement: <ErrorBoundary />,
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
        path: ROUTES.GUEST_BOOK(':id'),
        element: <GuestBookPage />,
      },
    ],
  },
  {
    Component: () => <HeaderLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: ROUTES.NOTIFICATION,
        element: <NotificationPage />,
      },
      {
        path: ROUTES.EDIT_PROFILE,
        element: <EditProfilePage />,
      },
      {
        path: ROUTES.ADD_PROFILE_IMAGE,
        element: <AddProfileImagePage />,
      },
      {
        path: ROUTES.POST_DETAIL(':id'),
        element: <PostDetailPage />,
      },
    ],
  },
])

export default router
