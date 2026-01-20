import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { KakaoLoginResponse, LoginResponse } from '@/api'
import { dateToId } from '@/utils/date'

interface UserState {
  isNew: boolean
  birthDate: string
  email: string
  name: string
  memberId: number
  associateId: number
  communityId: number

  login: (_userInfo: LoginResponse) => void
  socialLogin: (_userInfo: KakaoLoginResponse) => void
  signup: (_birthDate: Date) => void
  stale: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      isNew: false,
      birthDate: '',
      email: '',
      name: '',
      memberId: -1,
      associateId: -1,
      communityId: 1,

      login: (userInfo: LoginResponse) => {
        const payload = jwtDecode<TokenPayload>(userInfo.token.accessToken)
        set({
          memberId: userInfo.memberId,
          associateId: payload.associateId,
          communityId: payload.communityId,
        })
      },
      socialLogin: (userInfo: KakaoLoginResponse) => {
        const payload = jwtDecode<TokenPayload>(userInfo.token.accessToken)
        set({
          email: userInfo.email,
          memberId: userInfo.memberId,
          associateId: payload.associateId,
          communityId: payload.communityId,
        })
      },
      signup: (birthDate: Date) =>
        set({ isNew: true, birthDate: dateToId(birthDate) }),
      stale: () => set({ isNew: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

type TokenPayload = {
  memberId: number
  associateId: number
  communityId: number
}
