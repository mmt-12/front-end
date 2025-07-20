import type { IHeaderItem } from '@/types/IHeaderItem'
import { create } from 'zustand'

interface HeaderState {
  setRouteName: (routeName: string) => void
  setLeftItem: (item: IHeaderItem) => void
  setRightItem: (item: IHeaderItem) => void
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
