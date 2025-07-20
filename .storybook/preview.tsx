import { Global, ThemeProvider } from '@emotion/react'
import type { Preview } from '@storybook/react-vite'
import { globalStyle } from '../src/styles/global'
import { theme } from '../src/styles/theme'

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
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
