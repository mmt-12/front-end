// Import the firebase app / messaging packages
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js',
)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDUT5ji6Eyb8Il1kxG2X1YxoW6oE_c5OA',
  authDomain: 'memento-117c4.firebaseapp.com',
  projectId: 'memento-117c4',
  storageBucket: 'memento-117c4.firebasestorage.app',
  messagingSenderId: '203996348046',
  appId: '1:203996348046:web:508d12e7f1f57c08fb93df',
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

// Initialize messaging
const messaging = firebase.messaging()

messaging.onMessage(payload => {
  console.log('Received a message: ', payload)
  const title = payload.data.title
  self.registration.showNotification(title)
})

// Listen to bg messages
messaging.onBackgroundMessage(payload => {
  console.log('Received a bg message: ', payload)

  const title = payload.data.title

  // // Show notification when message received
  self.registration.showNotification(title, {
    body: payload.data.content,
  })
  // self.registration.showNotification(title, notification)
})

console.log('Firebase messaging service worker loaded')
