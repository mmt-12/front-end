import Layout from '@/layouts/Layout'
import { HomePage } from '@/pages/HomePage'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './ROUTES'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: () => <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])

export default router
