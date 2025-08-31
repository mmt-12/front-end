// hooks/notification.ts
import { useQuery } from '@tanstack/react-query'

import { api } from '../lib/api'
import type {
  NotificationListResponse,
  UnreadNotificationResponse,
} from '../types/api'

export interface NotificationListParams {
  cursor?: number
  size?: number
}

// 알림 목록 조회
export function useNotificationList(params?: NotificationListParams) {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => {
      const searchParams = new URLSearchParams()
      if (params?.cursor)
        searchParams.append('cursor', params.cursor.toString())
      if (params?.size) searchParams.append('size', params.size.toString())

      return api
        .get(`/v1/notifications?${searchParams}`)
        .then(r => r.data as NotificationListResponse)
    },
  })
}

// 안읽은 알림 조회
export function useUnreadNotifications() {
  return useQuery({
    queryKey: ['unread-notifications'],
    queryFn: () =>
      api
        .get('/v1/notifications/unread')
        .then(r => r.data as UnreadNotificationResponse),
    refetchInterval: 30000, // 30초마다 자동 갱신
  })
}
