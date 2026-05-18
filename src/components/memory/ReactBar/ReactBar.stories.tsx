import type { Meta, StoryObj } from '@storybook/react-vite'

import ReactBar from './ReactBar'

const meta = {
  title: 'components/memory/ReactBar',
  component: ReactBar,
  args: {
    iconSize: 30,
  },
} satisfies Meta<typeof ReactBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
