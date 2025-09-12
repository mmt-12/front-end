import type { MouseEvent } from 'react'

export interface IReaction {
  id: number
  url: string
  name: string
  size?: 'md' | 'lg'
  isActive?: boolean
  involved?: boolean
  onClick?: (_e: MouseEvent<HTMLDivElement>, _id: number) => void
}

export interface ReactionListProps {
  onClick: (_e: React.MouseEvent<HTMLDivElement>, _id: number) => void
  selectedId?: number
  reactions: IReaction[]
}
