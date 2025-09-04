// hooks/auth.ts
import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/utils/api'
import type {
  CommunitiesResponse,
  LoginResponse,
  SignUpRequest,
  UpdateMemberRequest,
} from '@/types/api'

// 로그인 (리다이렉트)
export function useLogin(code: string) {
  return useQuery<LoginResponse>({
    queryKey: ['kakao-login'],
    queryFn: () => api.get(`/v1/auth/redirect?code=${code}`).then(r => r.data),
  })
}

// 회원가입
export function useSignUp() {
  return useMutation({
    mutationFn: (data: SignUpRequest) =>
      api.post('/v1/members', data).then(r => r.data as LoginResponse),
  })
}

// 회원 정보 수정
export function useUpdateMember() {
  return useMutation({
    mutationFn: (data: UpdateMemberRequest) =>
      api.put('/v1/members', data).then(r => r.data),
  })
}

// 그룹 목록 조회
export function useAssociatesList() {
  return useQuery({
    queryKey: ['associates-list'],
    queryFn: () =>
      api
        .get('/v1/members/associates')
        .then(r => r.data as CommunitiesResponse),
  })
}
