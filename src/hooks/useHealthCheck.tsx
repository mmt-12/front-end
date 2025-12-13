import { useServerHealth } from '@/api'

export default function useHealthCheck() {
  const { data, isError, error } = useServerHealth()

  if (isError) {
    if (error.message.includes('timeout')) throw new Error('server-closed')
    else throw new Error('서버가 응답하지 않습니다.')
  }
  return data
}
