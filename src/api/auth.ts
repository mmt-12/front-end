// hooks/auth.ts
import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/utils/api'
import type {
  CommunitiesResponse,
  CreateMemberRequest,
  KakaoLoginResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  UpdateMemberRequest,
} from '@/types/api'

//일반 로그인
export function useLogin () {
  return useMutation({
    mutationFn: (data: LoginRequest) =>
      api.post('/v1/members/signin', data).then(r => r.data as LoginResponse),
  })
}

//일반 회원가입
export function useSignUp () {
  return useMutation({
    mutationFn: (data: SignupRequest) =>
      api.post('/v1/members/signup/normal', data).then(r => r.data as SignupResponse),
  })
}

// 카카오 로그인
export function useKakaoLogin (code: string) {
  return useQuery<KakaoLoginResponse>({
    queryKey: ['kakao-login', code],
    queryFn: () => api.get(`/v1/auth/redirect?code=${code}`).then(r => r.data),
    enabled: !!code,
  })
}

// 카카오 회원가입 (회원 정보 기입)
export function useKakaoSignUp () {
  return useMutation({
    mutationFn: (data: CreateMemberRequest) =>
      api.post('/v1/members/signup/kakao', data).then(r => r.data as KakaoLoginResponse),
  })
}

// 회원 정보 수정
export function useUpdateMember () {
  return useMutation({
    mutationFn: (data: UpdateMemberRequest) =>
      api.put('/v1/members', data).then(r => r.data),
  })
}

// 그룹 목록 조회
export function useAssociatesList () {
  return useQuery({
    queryKey: ['associates-list'],
    queryFn: () =>
      api
        .get('/v1/members/associates')
        .then(r => r.data as CommunitiesResponse),
  })
}
