import { useQuery } from '@tanstack/react-query'

import { api } from '@/utils/api'

export function useTest() {
  return useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      return api.get('/test').then(response => response.data)
    },
  })
}
