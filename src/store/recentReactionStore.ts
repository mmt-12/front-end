import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Emoji, Voice } from '@/types/api'

export type RecentEmoji = Pick<Emoji, 'id' | 'name' | 'url' | 'involved'>
export type RecentVoice = Pick<Voice, 'id' | 'name' | 'url' | 'involved'>

interface RecentReactionState {
  recentEmojis: RecentEmoji[]
  recentVoices: RecentVoice[]
  addRecentEmoji: (_emoji: RecentEmoji) => void
  addRecentVoice: (_voice: RecentVoice) => void
}

export const useRecentReactionStore = create<RecentReactionState>()(
  persist(
    set => ({
      recentEmojis: [],
      recentVoices: [],
      addRecentEmoji: emoji =>
        set(state => ({
          recentEmojis: [
            emoji,
            ...state.recentEmojis.filter(item => item.id !== emoji.id),
          ].slice(0, 6),
        })),
      addRecentVoice: voice =>
        set(state => ({
          recentVoices: [
            voice,
            ...state.recentVoices.filter(item => item.id !== voice.id),
          ].slice(0, 6),
        })),
    }),
    {
      name: 'recent-reactions-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
