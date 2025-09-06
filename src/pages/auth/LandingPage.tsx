import { useNavigate, useSearchParams } from 'react-router-dom'

import { useLogin } from '@/api'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function LandingPage() {
  const [searchParams] = useSearchParams()
  const { data } = useLogin(searchParams.get('code') || '')
  const navigate = useNavigate()
  const userStore = useUserStore()

  if (data) {
    userStore.login(data)
    if (data.memberId) navigate(ROUTES.MEMORY_LIST)
    else navigate(ROUTES.SIGNUP)
  }
  if (!data) return <div>회원 정보 불러오는 중...</div>
}
