import { useEffect, useRef, useState } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'

import NewBadgeModal from '@/components/modal/NewBadgeModal'
import { getToken } from '@/utils/api'
import { useModal } from './useModal'

export default function useSSE() {
  const [isConnected, setIsConnected] = useState(false)
  const eventSource = useRef<EventSourcePolyfill | null>(null)
  const { openOverlay } = useModal()

  useEffect(() => {
    console.log('SSE connecting...')
    eventSource.current = new EventSourcePolyfill(
      `${import.meta.env.VITE_API_BASE_URL}/v1/sse/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        withCredentials: true,
      },
    )
    eventSource.current.onmessage = function (event) {
      setIsConnected(true)
      const data = JSON.parse(event.data)
      openOverlay(<NewBadgeModal {...data.value} />)
    }
    eventSource.current.onopen = function () {
      setIsConnected(true)
      console.log('Connection to server opened.')
    }

    return () => {
      eventSource.current?.close()
      setIsConnected(false)
      console.log('Connection to server closed.')
    }
  }, [openOverlay])

  return isConnected
}
