import { Global, ThemeProvider } from '@emotion/react'
import type { Preview } from '@storybook/react-vite'
import { globalStyle } from '../src/styles/global'
import { theme } from '../src/styles/theme'
import { APIProvider } from '@vis.gl/react-google-maps'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <APIProvider
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
        >
          <div style={{ maxWidth: theme.maxWidth, margin: '0 auto' }}>
            <Story />
          </div>
        </APIProvider>
      </ThemeProvider>
    ),
  ],
}

export default preview
