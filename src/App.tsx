import Routes from '@/routes/index'
import { Global, ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { globalStyle } from '@/styles/global'
import { APIProvider } from '@vis.gl/react-google-maps'

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
