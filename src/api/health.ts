import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 서버 상태 조회
export function useServerHealth () {
  return useQuery({
    queryKey: ['server-health'],
    queryFn: () =>
      api
        .get(`/v1/health`)
        .then(r => r.data as { status: string }),
    retry: false
  })
}
