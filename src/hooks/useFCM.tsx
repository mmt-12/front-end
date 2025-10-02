import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

import { useRegisterFcmToken } from '@/api'
import NotificationModal from '@/components/modal/NotificationModal/NotificationModal'
import type { NotificationType } from '@/types/notification'
import { useModal } from './useModal'

export default function useFCM() {
  const [token, setToken] = useState<string>('')
  const { mutate: registerToken } = useRegisterFcmToken()
  const { openModal } = useModal()

  useEffect(() => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: 'memento-117c4.firebaseapp.com',
      projectId: 'memento-117c4',
      storageBucket: 'memento-117c4.firebasestorage.app',
      messagingSenderId: '203996348046',
      appId: '1:203996348046:web:508d12e7f1f57c08fb93df',
    }

    const app = initializeApp(firebaseConfig)

    const messaging = getMessaging(app)

    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.')
      return
    }

    if (Notification.permission === 'granted') {
      saveToken()
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          saveToken()
        }
      })
    }

    onMessage(messaging, payload => {
      console.log('Message received. ', payload)
      const notification = {
        title: payload.data?.title || '',
        content: payload.data?.content || '',
        actorId: Number(payload.data?.actorId) || 0,
        postId: Number(payload.data?.postId) || 0,
        memoryId: Number(payload.data?.memoryId) || 0,
        type: (payload.data?.type || '') as NotificationType,
      }
      openModal(<NotificationModal {...notification} />, {
        dimmBackground: false,
      })
    })

    function saveToken() {
      const storageToken = localStorage.getItem('fcmToken')
      if (storageToken) {
        console.log('Loaded FCM Token:', storageToken)
        setToken(storageToken)
      } else {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_VAPID_KEY,
        }).then(newToken => {
          console.log('Fetched FCM Token:', newToken)
          setToken(newToken)
        })
      }
    }
  }, [])

  useEffect(() => {
    console.log('setting token:', token)
    localStorage.setItem('fcmToken', token || '')
    if (!token) return
    registerToken(token)
  }, [token, registerToken])

  return null
}
