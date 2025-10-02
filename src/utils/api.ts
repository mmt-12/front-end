
import { ROUTES } from '@/routes/ROUTES'
import axios, { AxiosError, type AxiosResponse } from 'axios'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },

})

// JWT 토큰 관리
export const getToken = () => {
  return localStorage.getItem('accessToken')
}

export const setToken = (token: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem('accessToken', token.accessToken)
  localStorage.setItem('refreshToken', token.refreshToken)
}

export const removeToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

// Request interceptor - 자동으로 JWT 토큰 추가
api.interceptors.request.use(
  config => {
    const token = getToken()
    if (
      token &&
      !config.url?.includes('/sign-in') &&
      !config.url?.includes('/redirect')
    ) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Response interceptor - 토큰 자동 저장
api.interceptors.response.use(
  async response => {
    // 가짜 딜레이 추가 (개발용)
    if (import.meta.env.DEV) {
      await delay(5)
    }
    // 로그인 응답에서 토큰 저장
    if (response.data?.token) {
      setToken(response.data.token)
    }

    return response
  },
  async (error: AxiosError) => {
    // 401 응답에 대해 refresh token으로 토큰 재발급 시도
    console.log(error)
    if (error.response?.status === 401 && !error.config?.url?.includes('refresh')) {
      const newRequest = await handleUnauthorized(error.response)
      if (newRequest !== null) return newRequest
    }
    return Promise.reject(error)
  },
)

const handleUnauthorized = async (response: AxiosResponse) => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    try {
      const tokenResponse = await api.post('/v1/auth/refresh', {
        refreshToken,
      })
      setToken(tokenResponse.data.token)
      // 재발급된 토큰으로 원래 요청 재시도
      const originalRequest = response.config
      originalRequest.headers.Authorization = `Bearer ${tokenResponse.data.token.accessToken}`
      return api(originalRequest)
    } catch {
      // 토큰 재발급 실패
      console.log('토큰 재발급 실패')
    }
  }
  // 로그아웃 처리
  removeToken()
  window.location.href = ROUTES.LOGIN
  return null
}