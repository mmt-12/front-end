export interface INotification {
  id: number
  title: string
  content: string
  isRead: boolean
  type: NotificationType
  actorId: number | null
  memoryId: number | null
  postId: number | null
  createdAt: string
}

export type NotificationType =
  | 'ACHIEVE' | 'MEMORY'
  | 'REACTION'
  | 'POST'
  | 'GUESTBOOK'
  | 'MBTI'
  | 'NEWIMAGE'
  | 'BIRTHDAY'
  | 'ASSOCIATE'
  | ''
