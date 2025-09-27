import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import useSSE from '@/hooks/useSSE'
import { ROUTES } from '@/routes/ROUTES'
import { getToken, removeToken } from '@/utils/api'

export default function AuthGuard() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (!getToken()) {
      removeToken()
      navigate(ROUTES.LOGIN)
    }
  }, [location.pathname, navigate])

  useSSE()

  return <Outlet />
}
