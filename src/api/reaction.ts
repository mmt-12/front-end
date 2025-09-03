// hooks/reaction.ts
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { api } from '../lib/api'
import type { EmojiListResponse, VoiceListResponse } from '../types/api'

export interface VoiceListParams {
  size?: number
  keyword?: string
  cursor?: number
}

export interface EmojiListParams {
  size?: number
  keyword?: string
  cursor?: number
}

// 보이스 등록
export function useCreateVoice(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      api
        .post(`/v1/communities/${communityId}/voices`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voices', communityId] })
    },
  })
}

// 보이스 목록 조회
export function useVoiceList(communityId = 1, params?: VoiceListParams) {
  return useInfiniteQuery({
    queryKey: ['voices', communityId, params?.size, params?.keyword],
    initialPageParam: params?.cursor ?? 0,
    queryFn: ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams()
      searchParams.append('cursor', pageParam.toString())
      if (params?.size) searchParams.append('size', params.size.toString())
      if (params?.keyword) searchParams.append('keyword', params.keyword)

      return api
        .get(`/v1/communities/${communityId}/voices?${searchParams}`)
        .then(r => r.data as VoiceListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
  })
}

// 보이스 삭제
export function useDeleteVoice(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (voiceId: number) =>
      api
        .delete(`/v1/communities/${communityId}/voices/${voiceId}`)
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voices', communityId] })
    },
  })
}

// 이모지 등록
export function useCreateEmoji(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      api
        .post(`/v1/communities/${communityId}/emoji`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emojis', communityId] })
    },
  })
}

// 이모지 목록 조회
export function useEmojiList(communityId = 1, params?: EmojiListParams) {
  return useInfiniteQuery({
    queryKey: ['emojis', communityId, params?.size, params?.keyword],
    initialPageParam: params?.cursor ?? 0,
    queryFn: ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams()
      searchParams.append('cursor', pageParam.toString())
      if (params?.size) searchParams.append('size', params.size.toString())
      if (params?.keyword) searchParams.append('keyword', params.keyword)

      return api
        .get(`/v1/communities/${communityId}/emoji?${searchParams}`)
        .then(r => r.data as EmojiListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
  })
}

// 이모지 삭제
export function useDeleteEmoji(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (emojiId: number) =>
      api
        .delete(`/v1/communities/${communityId}/emoji/${emojiId}`)
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emojis', communityId] })
    },
  })
}
