import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_TEST_API_BASE_URL
    : import.meta.env.VITE_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// JWT 토큰 관리
export const getToken = () => {
  return localStorage.getItem('accessToken')
}

export const setToken = (token: string) => {
  localStorage.setItem('accessToken', token)
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
  response => {
    // 로그인 응답에서 토큰 자동 저장
    if (response.data?.token?.accessToken) {
      setToken(response.data.token.accessToken)
      if (response.data.token.refreshToken) {
        localStorage.setItem('refreshToken', response.data.token.refreshToken)
      }
    }
    return response
  },
  error => {
    return Promise.reject(error)
  },
)

