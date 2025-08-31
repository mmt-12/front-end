// hooks/reaction.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '../lib/api'
import type { EmojiListResponse, VoiceListResponse } from '../types/api'

export interface VoiceListParams {
  cursor?: number
  size?: number
  keyword?: string
}

export interface EmojiListParams {
  cursor?: number
  size?: number
  keyword?: string
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
  return useQuery({
    queryKey: ['voices', communityId, params],
    queryFn: () => {
      const searchParams = new URLSearchParams()
      if (params?.cursor)
        searchParams.append('cursor', params.cursor.toString())
      if (params?.size) searchParams.append('size', params.size.toString())
      if (params?.keyword) searchParams.append('keyword', params.keyword)

      return api
        .get(`/v1/communities/${communityId}/voices?${searchParams}`)
        .then(r => r.data as VoiceListResponse)
    },
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
  return useQuery({
    queryKey: ['emojis', communityId, params],
    queryFn: () => {
      const searchParams = new URLSearchParams()
      if (params?.cursor)
        searchParams.append('cursor', params.cursor.toString())
      if (params?.size) searchParams.append('size', params.size.toString())
      if (params?.keyword) searchParams.append('keyword', params.keyword)

      return api
        .get(`/v1/communities/${communityId}/emoji?${searchParams}`)
        .then(r => r.data as EmojiListResponse)
    },
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
