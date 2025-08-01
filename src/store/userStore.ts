import { create } from 'zustand'

interface UserState {
  isLoggedIn: boolean
  isNew: boolean
  birthDate: Date | null
  logout: () => void
  login: (_birthDate: Date | null) => void
  stale: () => void
}

export const useUserStore = create<UserState>()(set => ({
  isLoggedIn: false,
  isNew: false,
  birthDate: null,
  login: (birthDate: Date | null) =>
    set({ isLoggedIn: true, isNew: true, birthDate }),
  logout: () => set({ isLoggedIn: false }),
  stale: () => set({ isNew: false }),
}))
