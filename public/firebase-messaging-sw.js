// Import the firebase app / messaging packages
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js',
)

const ROUTES = {
  MEMORY_DETAIL: memoryId => `/memory/${memoryId}`,
  POST_DETAIL: (memoryId, postId) => `/memory/${memoryId}/post/${postId}`,
  GUEST_BOOK: associateId => `/guest-book/${associateId || 'me'}`,
  NOTIFICATION_LIST: '/notification',
}

function notificationToUrl(type, memoryId, postId, associateId) {
  let url
  if (type === 'ACHIEVE') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'MEMORY' && memoryId) {
    url = ROUTES.MEMORY_DETAIL(memoryId)
  } else if (type === 'REACTION' && memoryId && postId) {
    url = ROUTES.POST_DETAIL(memoryId, postId)
  } else if (type === 'POST' && memoryId && postId) {
    url = ROUTES.POST_DETAIL(memoryId, postId)
  } else if (type === 'GUESTBOOK') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'MBTI') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'NEWIMAGE') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'BIRTHDAY' && associateId) {
    url = ROUTES.GUEST_BOOK(associateId)
  } else if (type === 'ASSOCIATE' && associateId) {
    url = ROUTES.GUEST_BOOK(associateId)
  } else {
    url = ROUTES.NOTIFICATION_LIST
  }

  return url
}

function handleMessage(payload) {
  const url = notificationToUrl(
    payload.data.type,
    payload.data.memoryId,
    payload.data.postId,
    payload.data.associateId,
  )

  const title = payload.notification.title

  // Show notification when message received
  self.registration.showNotification(title, {
    body: payload.notification.body,
    badge: 'badge.png',
  })

  self.addEventListener('notificationclick', event => {
    event.notification.close()
    event.waitUntil(clients.openWindow(url))
  })
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDUT5ji6Eyb8Il1kxG2X1YxoW6oE_c5OA',
  authDomain: 'memento-117c4.firebaseapp.com',
  projectId: 'memento-117c4',
  storageBucket: 'memento-117c4.firebasestorage.app',
  messagingSenderId: '203996348046',
  appId: '1:203996348046:web:508d12e7f1f57c08fb93df',
}

// Initialize messaging
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// Listen to bg messages
// messaging.onMessage(handleMessage)
messaging.onBackgroundMessage(handleMessage)

console.log('Firebase messaging service worker loaded')
