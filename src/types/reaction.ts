import type { MouseEvent } from 'react'

export interface IReaction {
  id: string
  url: string
  size?: 'md' | 'lg'
  amount?: number
  isActive?: boolean
  iReacted?: boolean
  onClick: (_e: MouseEvent<HTMLDivElement>, _id: string) => void
}
