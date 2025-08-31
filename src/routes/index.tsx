import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import * as Layouts from '@/layouts'
import * as Pages from '@/pages'
import { ROUTES } from './ROUTES'

const router = createBrowserRouter([
  {
    path: '/',
    Component: () => <Layouts.RootLayout />,
    errorElement: <Pages.ErrorPage />,
    children: [
      {
        path: ROUTES.LOGIN,
        Component: () => <Layouts.PlainLayout />,
        children: [
          {
            index: true,
            element: <Pages.LoginPage />,
          },
          {
            path: ROUTES.SIGNUP,
            element: <Pages.SignupPage />,
          },
        ],
      },
      {
        path: '/',
        Component: () => <Layouts.DefaultLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.MEMORY_LIST} replace />,
          },
          {
            path: ROUTES.MEMORY_LIST,
            element: <Pages.MemoryListPage />,
          },
          {
            path: ROUTES.MAP,
            element: <Pages.MapPage />,
          },
          {
            path: ROUTES.CALENDAR,
            element: <Pages.CalendarPage />,
          },
          {
            path: ROUTES.GUEST_BOOK(':id'),
            element: <Pages.GuestBookPage />,
          },
        ],
      },
      {
        Component: () => <Layouts.HeaderLayout />,
        children: [
          {
            path: ROUTES.NOTIFICATION_LIST,
            element: <Pages.NotificationPage />,
          },
          {
            path: ROUTES.EDIT_PROFILE,
            element: <Pages.EditProfilePage />,
          },
          {
            path: ROUTES.ADD_PROFILE_IMAGE,
            element: <Pages.ProfileImageRegisterPage />,
          },
          {
            path: ROUTES.MEMORY_REGISTER,
            element: <Pages.MemoryRegisterPage />,
          },
          {
            path: ROUTES.MEMORY_DETAIL(':id'),
            element: <Pages.MemoryDetailPage />,
          },
          {
            path: ROUTES.POST_DETAIL(':id'),
            element: <Pages.PostDetailPage />,
          },
          {
            path: ROUTES.POST_REGISTER,
            element: <Pages.PostRegisterPage />,
          },
          {
            path: ROUTES.MEMBER_LIST,
            element: <Pages.MemberListPage />,
          },
        ],
      },
      {
        path: ROUTES.TEST,
        element: <Pages.TestPage />,
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
