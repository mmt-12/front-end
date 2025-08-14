import type { MouseEvent } from 'react'

export interface IReaction {
  id: number
  url: string
  name: string
  size?: 'md' | 'lg'
  amount?: number
  isActive?: boolean
  iReacted?: boolean
  onClick: (_e: MouseEvent<HTMLDivElement>, _id: number) => void
}
