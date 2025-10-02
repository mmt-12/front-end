import { useEffect, useRef } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

import { useRegisterFcmToken } from '@/api'

export default function useFCM() {
  const token = useRef<string | null>(null)
  const { mutate: registerToken } = useRegisterFcmToken()

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

    function saveToken() {
      const storageToken = localStorage.getItem('fcmToken')
      if (storageToken) {
        console.log('Loaded FCM Token:', storageToken)
        token.current = storageToken
      } else {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_VAPID_KEY,
        }).then(newToken => {
          console.log('Fetched FCM Token:', newToken)
          token.current = newToken
        })
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('fcmToken', token.current || '')
    if (!token.current) return
    registerToken(token.current)
  }, [token, registerToken])

  return null
}
