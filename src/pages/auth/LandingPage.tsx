import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useLogin } from '@/api'
import Loader from '@/components/common/Loader'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function LandingPage() {
  const [searchParams] = useSearchParams()
  const { data } = useLogin(searchParams.get('code') || '')
  const navigate = useNavigate()
  const login = useUserStore(s => s.login)

  useEffect(() => {
    if (data) {
      login(data)
      if (data.memberId) navigate(ROUTES.MEMORY_LIST, { replace: true })
      else navigate(ROUTES.SIGNUP, { replace: true })
    }
  }, [data, navigate, login])

  return <Loader />
}
