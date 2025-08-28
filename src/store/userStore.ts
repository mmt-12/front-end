import { create } from 'zustand'

import { dateToId } from '@/utils/date'

interface UserState {
  isLoggedIn: boolean
  isNew: boolean
  birthDate: string
  logout: () => void
  login: (_birthDate: Date) => void
  stale: () => void
}

export const useUserStore = create<UserState>()(set => ({
  isLoggedIn: false,
  isNew: false,
  birthDate: '',
  login: (birthDate: Date) =>
    set({ isLoggedIn: true, isNew: true, birthDate: dateToId(birthDate) }),
  logout: () => set({ isLoggedIn: false }),
  stale: () => set({ isNew: false }),
}))
