// hooks/memory.ts
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { api } from '@/utils/api'
import type {
  CreateMemoryRequest,
  MemoryImagesResponse,
  MemoryListResponse,
} from '@/types/api'

export interface MemoryListParams {
  size?: number
  keyword?: string
  startTime?: string
  endTime?: string
  cursor?: number
}

// 기억 생성
export function useCreateMemory(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMemoryRequest) =>
      api
        .post(`/v1/communities/${communityId}/memories`, data)
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories', communityId] })
    },
  })
}

// 기억 목록 조회
export function useMemoryList(communityId = 1, params?: MemoryListParams) {
  const { size, keyword, startTime, endTime } = params || {}
  return useInfiniteQuery({
    queryKey: ['memories', communityId, size, keyword, startTime, endTime],
    initialPageParam: params?.cursor ?? 0,
    queryFn: ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams()
      searchParams.append('cursor', pageParam.toString())
      if (size) searchParams.append('size', size.toString())
      if (keyword) searchParams.append('keyword', keyword)
      if (startTime) searchParams.append('startTime', startTime)
      if (endTime) searchParams.append('endTime', endTime)

      return api
        .get(`/v1/communities/${communityId}/memories?${searchParams}`)
        .then(r => r.data as MemoryListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
  })
}

// 기억 수정
export function useUpdateMemory(communityId = 1, memoryId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMemoryRequest) =>
      api
        .put(`/v1/communities/${communityId}/memories/${memoryId}`, data)
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories', communityId] })
    },
  })
}

// 기억 삭제
export function useDeleteMemory(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (memoryId: number) =>
      api
        .delete(`/v1/communities/${communityId}/memories/${memoryId}`)
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories', communityId] })
    },
  })
}

// 기억 이미지 다운로드
export function useMemoryImages(communityId = 1, memoryId: number) {
  return useQuery({
    queryKey: ['memory-images', communityId, memoryId],
    queryFn: () =>
      api
        .get(`/v1/communities/${communityId}/memories/${memoryId}`)
        .then(r => r.data as MemoryImagesResponse),
  })
}
