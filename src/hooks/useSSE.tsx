import { useEffect, useRef } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'

import { getToken } from '@/utils/api'

export default function useSSE() {
  const eventSource = useRef<EventSourcePolyfill | null>(null)
  useEffect(() => {
    eventSource.current = new EventSourcePolyfill(
      `${import.meta.env.VITE_API_BASE_URL}/v1/sse/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    eventSource.current.onmessage = function (event) {
      console.log('New message:', event.data)
    }
    eventSource.current.onerror = function (err) {
      console.error('EventSource failed:', err)
    }
  }, [])
  return eventSource
}
