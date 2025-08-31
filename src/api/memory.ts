// hooks/memory.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type {
  CreateMemoryRequest,
  MemoryImagesResponse,
  MemoryListResponse,
} from '@/types/api'

export interface MemoryListParams {
  cursor?: number
  size?: number
  keyword?: string
  startTime?: string
  endTime?: string
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
  return useQuery({
    queryKey: ['memories', communityId, params],
    queryFn: () => {
      const searchParams = new URLSearchParams()
      if (params?.cursor)
        searchParams.append('cursor', params.cursor.toString())
      if (params?.size) searchParams.append('size', params.size.toString())
      if (params?.keyword) searchParams.append('keyword', params.keyword)
      if (params?.startTime) searchParams.append('startTime', params.startTime)
      if (params?.endTime) searchParams.append('endTime', params.endTime)

      return api
        .get(`/v1/communities/${communityId}/memories?${searchParams}`)
        .then(r => r.data as MemoryListResponse)
    },
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
