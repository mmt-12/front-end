import type { IHeaderItem } from '@/types/common'
import { create } from 'zustand'

interface HeaderState {
  setRouteName: (_routeName: string) => void
  setLeftItem: (_item: IHeaderItem) => void
  setRightItem: (_item: IHeaderItem) => void
  routeName: string
  leftItem: IHeaderItem
  rightItem: IHeaderItem
  setHeader: (_header: {
    routeName?: string
    leftItem?: IHeaderItem
    rightItem?: IHeaderItem
  }) => void
}

export const useHeaderStore = create<HeaderState>()((set, get) => ({
  routeName: '',
  leftItem: {
    icon: null,
    onClick: () => { },
  },
  rightItem: {
    icon: null,
    onClick: () => { },
  },
  setRouteName: (routeName: string) => {
    set(() => ({ routeName }))
  },
  setLeftItem: (leftItem: IHeaderItem) => {
    set(() => ({
      leftItem,
    }))
  },
  setRightItem: (rightItem: IHeaderItem) => {
    set(() => ({
      rightItem,
    }))
  },

  // atomic update with internal guards to prevent useless re-renders
  setHeader: ({ routeName, leftItem, rightItem }: { routeName?: string; leftItem?: IHeaderItem; rightItem?: IHeaderItem }) => {
    const s = get()
    const next = {
      routeName: routeName ?? s.routeName,
      leftItem: leftItem ?? s.leftItem,
      rightItem: rightItem ?? s.rightItem,
    }
    set(next)
  },
}))
