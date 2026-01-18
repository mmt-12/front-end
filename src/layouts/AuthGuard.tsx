import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAttendance, useExclusive, useRegisterFcmToken } from '@/api'
import useFCM from '@/hooks/useFCM'
import useSSE from '@/hooks/useSSE'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { getToken, removeToken } from '@/utils/api'

export default function AuthGuard() {
  const navigate = useNavigate()
  const location = useLocation()
  const communityId = useUserStore(s => s.communityId)
  const { mutate: attendance } = useAttendance(communityId)
  const { mutate: achiveExclusive } = useExclusive(communityId)
  const token = useFCM()
  const { mutate: registerToken } = useRegisterFcmToken()

  useEffect(() => {
    if (token) {
      localStorage.setItem('fcmToken', token)
      registerToken(token)
    }
  }, [token, registerToken])

  useEffect(() => {
    if (!getToken()) {
      removeToken()
      navigate(ROUTES.ENTRANCE)
    }
  }, [location.pathname, navigate])

  const isSSEConnected = useSSE()

  useEffect(() => {
    if (!isSSEConnected || !attendance || !achiveExclusive) return
    attendance()
    achiveExclusive()
  }, [isSSEConnected, attendance, achiveExclusive])

  return <Outlet />
}
