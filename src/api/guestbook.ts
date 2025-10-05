// hooks/guestbook.ts
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import type {
  AchievementListResponse,
  Associate,
  AssociateListResponse,
  CreateGuestBookRequest,
  CreateMbtiTestRequest,
  GuestBookListResponse,
  MbtiTestResponse,
  ProfileImageListResponse,
  UpdateAssociateRequest,
} from '@/types/api'
import { api } from '@/utils/api'

export interface AssociateListParams {
  keyword?: string
  size?: number
  cursor?: number
}

export interface GuestBookListParams {
  size?: number
  cursor?: number
}

export interface ProfileImageListParams {
  size?: number
  cursor?: number
}

// 프로필 조회
export function useAssociateProfile(communityId = 1, associateId: number) {
  return useQuery({
    queryKey: ['associate-profile', communityId, associateId],
    queryFn: () =>
      api
        .get(`/v1/communities/${communityId}/associates/${associateId}`)
        .then(r => r.data as Associate),
  })
}

// 참여자 목록 조회
export function useAssociateList(
  communityId = 1,
  params?: AssociateListParams,
) {
  const size = params?.size ?? 10
  return useInfiniteQuery({
    queryKey: ['associates', communityId, params?.keyword, size],
    initialPageParam: params?.cursor,
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams()
      if (params?.keyword) searchParams.append('keyword', params.keyword)
      if (size) searchParams.append('size', size.toString())
      if (pageParam) searchParams.append('cursor', pageParam.toString())

      return api
        .get(`/v1/communities/${communityId}/associates?${searchParams}`)
        .then(r => r.data as AssociateListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  })
}

// 프로필 수정
export function useUpdateAssociate(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAssociateRequest) =>
      api
        .put(`/v1/communities/${communityId}/associates`, data)
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associates', communityId] })
      queryClient.invalidateQueries({
        queryKey: ['associate-profile', communityId],
      })
    },
  })
}

// 업적 조회
export function useAchievements(communityId = 1, associateId: number) {
  return useQuery({
    queryKey: ['achievements', communityId, associateId],
    queryFn: () =>
      api
        .get(
          `/v1/communities/${communityId}/associates/${associateId}/achievements`,
        )
        .then(r => r.data as AchievementListResponse),
  })
}

// 업적 획득
export function useAchieve(communityId = 1) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content: string) =>
      api
        .post(`/v1/communities/${communityId}/achievements`, { content })
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements', communityId] })
    },
  })
}

// 방명록 조회
export function useGuestBookList(
  communityId = 1,
  associateId: number,
  params?: GuestBookListParams,
  options?: any,
) {
  const size = params?.size ?? 10
  return useInfiniteQuery({
    queryKey: ['guestbooks', communityId, associateId, size],
    initialPageParam: params?.cursor,
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams()
      if (size) searchParams.append('size', size.toString())
      if (pageParam) searchParams.append('cursor', pageParam.toString())

      return api
        .get(
          `/v1/communities/${communityId}/associates/${associateId}/guest-books?${searchParams}`,
        )
        .then(r => r.data as GuestBookListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    refetchInterval: 1000,
    ...options,
  })
}

// 방명록 일회용 보이스 생성
export function useCreateGuestBookBubble(communityId = 1, associateId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      api
        .post(
          `/v1/communities/${communityId}/associates/${associateId}/guest-books/bubble`,
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
        queryKey: ['guestbooks', communityId, associateId],
      })
    },
  })
}

// 방명록 리액션 생성
export function useCreateGuestBookReaction(
  communityId = 1,
  associateId: number,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateGuestBookRequest) =>
      api
        .post(
          `/v1/communities/${communityId}/associates/${associateId}/guest-books`,
          data,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guestbooks', communityId, associateId],
      })
    },
  })
}

// 방명록 텍스트 생성
export function useCreateGuestBookText(communityId = 1, associateId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateGuestBookRequest) =>
      api
        .post(
          `/v1/communities/${communityId}/associates/${associateId}/guest-books`,
          data,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guestbooks', communityId, associateId],
      })
    },
  })
}

// 방명록 삭제
export function useDeleteGuestBook(communityId = 1, associateId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (guestBookId: number) =>
      api
        .delete(
          `/v1/communities/${communityId}/associates/${associateId}/guest-books/${guestBookId}`,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guestbooks', communityId, associateId],
      })
    },
  })
}

// MBTI 조회
export function useMbtiTest(communityId = 1, associateId: number) {
  return useQuery({
    queryKey: ['mbti-test', communityId, associateId],
    queryFn: () =>
      api
        .get(
          `/v1/communities/${communityId}/associates/${associateId}/mbti-tests`,
        )
        .then(r => r.data as MbtiTestResponse),
  })
}

// MBTI 등록
export function useCreateMbtiTest(communityId = 1, associateId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMbtiTestRequest) =>
      api
        .post(
          `/v1/communities/${communityId}/associates/${associateId}/mbti-tests`,
          data,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mbti-test', communityId, associateId],
      })
    },
  })
}

// 프로필 이미지 조회
export function useProfileImageList(
  communityId = 1,
  associateId: number,
  params?: ProfileImageListParams,
) {
  const size = params?.size ?? 10
  return useInfiniteQuery({
    queryKey: ['profile-images', communityId, associateId, size],
    initialPageParam: params?.cursor,
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams()
      if (size) searchParams.append('size', size.toString())
      if (pageParam) searchParams.append('cursor', pageParam.toString())

      return api
        .get(
          `/v1/communities/${communityId}/associates/${associateId}/profile-images?${searchParams}`,
        )
        .then(r => r.data as ProfileImageListResponse)
    },
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  })
}

// 프로필 이미지 등록
export function useCreateProfileImage(communityId = 1, associateId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      api
        .post(
          `/v1/communities/${communityId}/associates/${associateId}/profile-images`,
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
        queryKey: ['profile-images', communityId, associateId],
      })
    },
  })
}

// 프로필 이미지 등록 취소
export function useDeleteProfileImage(communityId = 1, associateId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (imageId: number) =>
      api
        .delete(
          `/v1/communities/${communityId}/associates/${associateId}/profile-images/${imageId}`,
        )
        .then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile-images', communityId, associateId],
      })
    },
  })
}

export function useAttendance(communityId = 1) {
  return useMutation({
    mutationFn: () =>
      api
        .post(`/v1/communities/${communityId}/achievements/attendance`)
        .then(r => r.data),
  })
}

export function useExclusive(communityId = 1) {
  return useMutation({
    mutationFn: () =>
      api
        .post(`/v1/communities/${communityId}/achievements/exclusive`)
        .then(r => r.data),
  })
}
