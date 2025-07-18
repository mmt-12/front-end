import { RouterProvider } from 'react-router-dom'
import router from '@/routes/index'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
