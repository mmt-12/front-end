// hooks/notification.ts
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { api } from '../utils/api'
import type {
  NotificationListResponse,
  UnreadNotificationResponse,
} from '../types/api'

export interface NotificationListParams {
  size?: number
  cursor?: number
}

// 알림 목록 조회
export function useNotificationList(params?: NotificationListParams) {
  return useInfiniteQuery({
    queryKey: ['notifications', params?.size],
    initialPageParam: params?.cursor ?? 0,
    queryFn: ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams()
      searchParams.append('cursor', pageParam.toString())
      if (params?.size) searchParams.append('size', params.size.toString())

      return api
        .get(`/v1/notifications?${searchParams}`)
        .then(r => r.data as NotificationListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
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
