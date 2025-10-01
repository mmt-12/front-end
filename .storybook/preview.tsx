import { Global, ThemeProvider } from '@emotion/react'
import type { Preview } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { APIProvider } from '@vis.gl/react-google-maps'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import { ModalProvider } from '../src/contexts/ModalProvider'
import { globalStyle } from '../src/styles/global'
import { theme } from '../src/styles/theme'
import { storybookStyle } from './style.ts'

const queryClient = new QueryClient()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  initialGlobals: {
    viewport: { value: 'galaxys9', isRotated: false },
  },
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Global styles={[globalStyle, storybookStyle]} />
        <APIProvider
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
        >
          <QueryClientProvider client={queryClient}>
            <ModalProvider>
              <Story />
            </ModalProvider>
          </QueryClientProvider>
        </APIProvider>
      </ThemeProvider>
    ),
  ],
}

export default preview
