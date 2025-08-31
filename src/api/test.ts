import { useQuery } from '@tanstack/react-query'

import { mockApi } from '@/lib/mockApi'

export function useTest() {
  return useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      return mockApi.get('/test').then(response => response.data)
    },
  })
}
