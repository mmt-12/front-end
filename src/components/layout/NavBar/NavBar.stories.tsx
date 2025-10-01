import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { expect } from 'storybook/test'

import NavBar from '.'

const meta = {
  title: 'components/NavBar',
  component: NavBar,
  parameters: {
    reactRouter: {
      routePath: '*',
    },
  },
  decorators: [withRouter],
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button')
    await expect(buttons).toHaveLength(1)
  },
} satisfies Meta<typeof NavBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
