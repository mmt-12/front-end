import { Global } from '@emotion/react'
import type { Preview } from '@storybook/react-vite'
import { globalStyle } from '../src/styles/global'

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
      <>
        <Global styles={globalStyle} />
        <Story />
      </>
    ),
  ],
}

export default preview
