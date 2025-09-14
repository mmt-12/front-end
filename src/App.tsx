import { Global, ThemeProvider } from '@emotion/react'
import { APIProvider } from '@vis.gl/react-google-maps'

import Routes from '@/routes/index'
import { globalStyle } from '@/styles/global'
import { theme } from '@/styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
        <Routes />
      </APIProvider>
    </ThemeProvider>
  )
}

export default App
