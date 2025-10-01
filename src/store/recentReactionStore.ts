import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Reaction } from '@/types/api'

type RecentReactionContext = {
  memberId: number
  communityId: number
}

type RecentReactionCollection = {
  emojis: Reaction[]
  voices: Reaction[]
}

interface RecentReactionState {
  recentsByContext: Record<string, RecentReactionCollection>
  addRecentEmoji: (_emoji: Reaction, _context: RecentReactionContext) => void
  addRecentVoice: (_voice: Reaction, _context: RecentReactionContext) => void
}

const MAX_RECENT_REACTIONS = 6

const createContextKey = ({ memberId, communityId }: RecentReactionContext) =>
  `${memberId}:${communityId}`

const getInitialCollection = (): RecentReactionCollection => ({
  emojis: [],
  voices: [],
})

export const useRecentReactionStore = create<RecentReactionState>()(
  persist(
    set => ({
      recentsByContext: {},
      addRecentEmoji: (emoji, context) =>
        set(state => {
          const contextKey = createContextKey(context)
          const collection = state.recentsByContext[contextKey] ?? getInitialCollection()
          const filtered = collection.emojis.filter(item => item.id !== emoji.id)
          const updatedEmojis = [emoji, ...filtered].slice(0, MAX_RECENT_REACTIONS)

          return {
            recentsByContext: {
              ...state.recentsByContext,
              [contextKey]: {
                emojis: updatedEmojis,
                voices: collection.voices,
              },
            },
          }
        }),
      addRecentVoice: (voice, context) =>
        set(state => {
          const contextKey = createContextKey(context)
          const collection = state.recentsByContext[contextKey] ?? getInitialCollection()
          const filtered = collection.voices.filter(item => item.id !== voice.id)
          const updatedVoices = [voice, ...filtered].slice(0, MAX_RECENT_REACTIONS)

          return {
            recentsByContext: {
              ...state.recentsByContext,
              [contextKey]: {
                emojis: collection.emojis,
                voices: updatedVoices,
              },
            },
          }
        }),
    }),
    {
      name: 'recent-reaction-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        recentsByContext: state.recentsByContext,
      }),
    },
  ),
)

export { createContextKey as createRecentReactionContextKey }
export type { RecentReactionContext }
