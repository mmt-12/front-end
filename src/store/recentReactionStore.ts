import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Emoji, Voice } from '@/types/api'

interface RecentReactionState {
  recentEmojis: Emoji[]
  recentVoices: Voice[]
  addRecentEmoji: (_emoji: Emoji) => void
  addRecentVoice: (_voice: Voice) => void
}

const MAX_RECENT_REACTIONS = 6

export const useRecentReactionStore = create<RecentReactionState>()(
  persist(
    set => ({
      recentEmojis: [],
      recentVoices: [],
      addRecentEmoji: emoji =>
        set(state => {
          const filtered = state.recentEmojis.filter(item => item.id !== emoji.id)
          return {
            recentEmojis: [emoji, ...filtered].slice(0, MAX_RECENT_REACTIONS),
          }
        }),
      addRecentVoice: voice =>
        set(state => {
          const filtered = state.recentVoices.filter(item => item.id !== voice.id)
          return {
            recentVoices: [voice, ...filtered].slice(0, MAX_RECENT_REACTIONS),
          }
        }),
    }),
    {
      name: 'recent-reaction-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        recentEmojis: state.recentEmojis,
        recentVoices: state.recentVoices,
      }),
    },
  ),
)
