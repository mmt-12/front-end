import type { INotification } from '@/types/notification'

export const NOTIFICATIONS: INotification[] = [
  {
    id: 1,
    title: '업적 달성',
    content: '업적 달성',
    isRead: false,
    type: 'ACHIEVE',
    actorId: null,
    memoryId: null,
    postId: null,
    createdAt: new Date('2025-07-21T12:00:00Z'),
  },
  {
    id: 2,
    title: '리액션',
    content: '유선우님이 포스트에 반응을 남겼어요.',
    isRead: false,
    type: 'REACTION',
    actorId: null,
    memoryId: 1,
    postId: 2,
    createdAt: new Date('2025-06-30T12:00:00Z'),
  },
  {
    id: 3,
    title: '방명록',
    content: '누군가가 방명록에 코멘트를 남겼어요.',
    isRead: true,
    type: 'GUESTBOOK',
    actorId: null,
    memoryId: null,
    postId: null,
    createdAt: new Date('2025-05-25T12:00:00Z'),
  },
]
