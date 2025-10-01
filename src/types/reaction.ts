import type { MouseEvent } from 'react'

export interface IReaction {
  id: number
  url: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  isActive?: boolean
  involved?: boolean
  onClick?: (_e: MouseEvent<HTMLDivElement>) => void
  isPost?: boolean
}

export interface ReactionListProps {
  onClick: (_e: React.MouseEvent<HTMLDivElement>, _id: number) => void
  selectedUrl?: string
  reactions: IReaction[]
  size: 'sm' | 'md'
}
