import type { IHeaderItem } from '@/types/common'
import { create } from 'zustand'

interface HeaderState {
  setRouteName: (_routeName: string) => void
  setLeftItem: (_item: IHeaderItem) => void
  setRightItem: (_item: IHeaderItem) => void
  routeName: string
  items: {
    left: IHeaderItem
    right: IHeaderItem
  }
}

export const useHeaderStore = create<HeaderState>()(set => ({
  routeName: '',
  items: {
    left: {
      icon: null,
      onClick: () => console.log('Left clicked'),
    },
    right: {
      icon: null,
      onClick: () => console.log('Right clicked'),
    },
  },

  setRouteName: (routeName: string) => set(() => ({ routeName })),
  setLeftItem: (item: IHeaderItem) =>
    set(state => ({
      items: {
        ...state.items,
        left: item,
      },
    })),
  setRightItem: (item: IHeaderItem) =>
    set(state => ({
      items: {
        ...state.items,
        right: item,
      },
    })),
}))
