// hooks/notification.ts
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

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
export function useNotificationList (params?: NotificationListParams) {
  const size = params?.size ?? 10
  const queryClient = useQueryClient()

  return useInfiniteQuery({
    queryKey: ['notifications', size],
    initialPageParam: params?.cursor,
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams()
      if (pageParam) searchParams.append('cursor', pageParam.toString())
      if (size) searchParams.append('size', size.toString())

      return api
        .get(`/v1/notifications?${searchParams}`)
        .then(r => {
          queryClient.invalidateQueries({
            queryKey: ['unread-notifications'],
          })
          return r.data as NotificationListResponse
        })
    },
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  })
}

// 안읽은 알림 조회
export function useUnreadNotifications () {
  return useQuery({
    queryKey: ['unread-notifications'],
    queryFn: () =>
      api
        .get('/v1/notifications/unread')
        .then(r => r.data as UnreadNotificationResponse),
    refetchInterval: 5000, // 5초마다 자동 갱신
  })
}
