import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import DefaultLayout from '@/layouts/DefaultLayout'
import HeaderLayout from '@/layouts/HeaderLayout'
import PlainLayout from '@/layouts/PlainLayout'
import RootLayout from '@/layouts/RootLayout'
import CalendarPage from '@/pages/CalendarPage'
import ErrorBoundary from '@/pages/ErrorBoundary'
import AddProfileImagePage from '@/pages/guest-book/AddProfileImagePage'
import EditProfilePage from '@/pages/guest-book/EditProfilePage'
import GuestBookPage from '@/pages/guest-book/GuestBookPage'
import MemberPage from '@/pages/guest-book/MemberPage'
import LoginPage from '@/pages/LoginPage'
import MapPage from '@/pages/MapPage'
import MemoryDetailPage from '@/pages/memory/MemoryDetailPage'
import MemoryListPage from '@/pages/memory/MemoryListPage'
import MemoryRegisterPage from '@/pages/memory/MemoryRegisterPage'
import PostDetailPage from '@/pages/memory/PostDetailPage'
import PostRegisterPage from '@/pages/memory/PostRegisterPage'
import NotificationPage from '@/pages/NotificationPage'
import SignupPage from '@/pages/SignupPage'
import { ROUTES } from './ROUTES'

const router = createBrowserRouter([
  {
    path: '/',
    Component: () => <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
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
        path: '/',
        Component: () => <DefaultLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.MEMORY_LIST} replace />,
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
            path: ROUTES.GUEST_BOOK(':id'),
            element: <GuestBookPage />,
          },
        ],
      },
      {
        Component: () => <HeaderLayout />,
        children: [
          {
            path: ROUTES.NOTIFICATION_LIST,
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
            path: ROUTES.MEMORY_REGISTER,
            element: <MemoryRegisterPage />,
          },
          {
            path: ROUTES.MEMORY_DETAIL(':id'),
            element: <MemoryDetailPage />,
          },
          {
            path: ROUTES.POST_DETAIL(':id'),
            element: <PostDetailPage />,
          },
          {
            path: ROUTES.POST_REGISTER,
            element: <PostRegisterPage />,
          },
          {
            path: ROUTES.MEMBER,
            element: <MemberPage />,
          },
        ],
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
