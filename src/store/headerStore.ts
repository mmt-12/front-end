import type { IHeaderItem } from '@/types/common'
import { create } from 'zustand'

interface HeaderState {
  setRouteName: (_routeName: string) => void
  setLeftItem: (_item: IHeaderItem) => void
  setRightItem: (_item: IHeaderItem) => void
  routeName: string
  leftItem: IHeaderItem
  rightItem: IHeaderItem
}

const isEqualItem = (oldItem: IHeaderItem, newItem: IHeaderItem): boolean => {
  return oldItem.icon === newItem.icon
}

export const useHeaderStore = create<HeaderState>()((set, get) => ({
  routeName: '',
  leftItem: {
    icon: null,
    onClick: () => {},
  },
  rightItem: {
    icon: null,
    onClick: () => {},
  },
  setRouteName: (routeName: string) => {
    if (get().routeName === routeName) return
    set(() => ({ routeName }))
  },
  setLeftItem: (leftItem: IHeaderItem) => {
    if (isEqualItem(get().leftItem, leftItem)) return
    set(() => ({
      leftItem,
    }))
  },
  setRightItem: (rightItem: IHeaderItem) => {
    if (isEqualItem(get().rightItem, rightItem)) return
    set(() => ({
      rightItem,
    }))
  },
}))
