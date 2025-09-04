// hooks/post.ts
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { api } from '../utils/api'
import type { Post, PostListResponse } from '../types/api'

// 포스트 상세 조회
export function usePost(communityId = 1, memoryId: number, postId: number) {
  return useQuery({
    queryKey: ['post', communityId, memoryId, postId],
    queryFn: () =>
      api
        .get(
          `/v1/communities/${communityId}/memories/${memoryId}/posts/${postId}`,
        )
        .then(r => r.data as Post),
  })
}

// 포스트 목록 조회
export interface PostListParams {
  cursor?: number
  size?: number
}

export function usePostList(
  communityId = 1,
  memoryId: number,
  params?: PostListParams,
) {
  return useInfiniteQuery({
    queryKey: ['posts', communityId, memoryId, params?.size],
    initialPageParam: params?.cursor ?? 0,
    queryFn: ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams()
      searchParams.append('cursor', pageParam.toString())
      if (params?.size) searchParams.append('size', params.size.toString())

      return api
        .get(
          `/v1/communities/${communityId}/memories/${memoryId}/posts?${searchParams}`,
        )
        .then(r => r.data as PostListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
  })
}

// 포스트 등록
export function useCreatePost(communityId = 1, memoryId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      api
        .post(
          `/v1/communities/${communityId}/memories/${memoryId}/posts`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', communityId, memoryId],
      })
    },
  })
}

// 포스트 수정
export function useUpdatePost(
  communityId = 1,
  memoryId: number,
  postId: number,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      api
        .put(
          `/v1/communities/${communityId}/memories/${memoryId}/posts/${postId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', communityId, memoryId],
      })
      queryClient.invalidateQueries({
        queryKey: ['post', communityId, memoryId, postId],
      })
    },
  })
}

// 포스트 삭제
export function useDeletePost(communityId = 1, memoryId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) =>
      api
        .delete(
          `/v1/communities/${communityId}/memories/${memoryId}/posts/${postId}`,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', communityId, memoryId],
      })
    },
  })
}

// 이모지 코멘트 등록
export function useCreateEmojiComment(
  communityId = 1,
  memoryId: number,
  postId: number,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { emojiId: number }) =>
      api
        .post(
          `/v1/communities/${communityId}/memories/${memoryId}/posts/${postId}/comments/emoji`,
          data,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', communityId, memoryId, postId],
      })
      queryClient.invalidateQueries({
        queryKey: ['posts', communityId, memoryId],
      })
    },
  })
}

// 보이스 코멘트 등록
export function useCreateVoiceComment(
  communityId = 1,
  memoryId: number,
  postId: number,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { voiceId: number }) =>
      api
        .post(
          `/v1/communities/${communityId}/memories/${memoryId}/posts/${postId}/comments/voices`,
          data,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', communityId, memoryId, postId],
      })
      queryClient.invalidateQueries({
        queryKey: ['posts', communityId, memoryId],
      })
    },
  })
}

// 일회용 보이스 코멘트 등록
export function useCreateBubbleComment(
  communityId = 1,
  memoryId: number,
  postId: number,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      api
        .post(
          `/v1/communities/${communityId}/memories/${memoryId}/posts/${postId}/comments/bubble`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', communityId, memoryId, postId],
      })
      queryClient.invalidateQueries({
        queryKey: ['posts', communityId, memoryId],
      })
    },
  })
}

// 코멘트 삭제
export function useDeleteComment(
  communityId = 1,
  memoryId: number,
  postId: number,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) =>
      api
        .delete(
          `/v1/communities/${communityId}/memories/${memoryId}/posts/${postId}/comments/${commentId}`,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', communityId, memoryId, postId],
      })
      queryClient.invalidateQueries({
        queryKey: ['posts', communityId, memoryId],
      })
    },
  })
}
