import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

import type { LoginResponse } from '@/api'
import { api, removeToken } from '@/utils/api'
import { dateToId } from '@/utils/date'

interface UserState {
  isLoggedIn: boolean
  isNew: boolean
  birthDate: string
  email: string
  name: string
  memberId: number
  associateId: number
  communityId: number

  login: (_userInfo: LoginResponse) => void
  logout: () => void
  signup: (_birthDate: Date) => void
  stale: () => void
}

export const useUserStore = create<UserState>()(set => ({
  isLoggedIn: false,
  isNew: false,
  birthDate: '',
  email: '',
  name: '',
  memberId: -1,
  associateId: -1,
  communityId: 1,

  login: (userInfo: LoginResponse) => {
    api.defaults.headers.common.Authorization = `Bearer ${userInfo.token.accessToken}`
    const payload = jwtDecode<TokenPayload>(userInfo.token.accessToken)
    // 로그인 성공 시 상태 갱신
    set({
      isLoggedIn: true,
      email: userInfo.email,
      memberId: userInfo.memberId,
      associateId: payload.associateId,
      communityId: payload.communityId,
    })
  },
  logout: () => {
    set({ isLoggedIn: false })
    removeToken()
  },
  signup: (birthDate: Date) =>
    set({ isLoggedIn: true, isNew: true, birthDate: dateToId(birthDate) }),
  stale: () => set({ isNew: false }),
}))

type TokenPayload = {
  memberId: number
  associateId: number
  communityId: number
}
