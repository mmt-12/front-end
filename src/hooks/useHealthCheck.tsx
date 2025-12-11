import { useServerHealth } from '@/api'

export default function useHealthCheck() {
  const { data, isPending } = useServerHealth()
  if (!isPending && (!data || data.status !== 'OK')) {
    throw new Error('server-closed')
  }
  return data
}
