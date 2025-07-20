import { RouterProvider } from 'react-router-dom'
import router from '@/routes/index'
import { Global, ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { globalStyle } from '@/styles/global'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
