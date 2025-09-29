import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import * as Layouts from '@/layouts'
import * as Pages from '@/pages'
import { ROUTES } from './ROUTES'

const router = createBrowserRouter([
  {
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
        path: ROUTES.LANDING,
        element: <Pages.LandingPage />,
      },
      {
        Component: () => <Layouts.AuthGuard />,
        children: [
          {
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
                path: ROUTES.GUEST_BOOK(':associateId'),
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
                path: ROUTES.ADD_PROFILE_IMAGE(':associateId'),
                element: <Pages.ProfileImageRegisterPage />,
              },
              {
                path: ROUTES.MEMORY_REGISTER,
                element: <Pages.MemoryRegisterPage />,
              },
              {
                path: ROUTES.MEMORY_DETAIL(':memoryId'),
                element: <Pages.MemoryDetailPage />,
              },
              {
                path: ROUTES.POST_DETAIL(':memoryId', ':postId'),
                element: <Pages.PostDetailPage />,
              },
              {
                path: ROUTES.POST_REGISTER(':memoryId'),
                element: <Pages.PostRegisterPage />,
              },
              {
                path: ROUTES.POST_EDIT(':memoryId', ':postId'),
                element: <Pages.PostEditPage />,
              },
              {},
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
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
