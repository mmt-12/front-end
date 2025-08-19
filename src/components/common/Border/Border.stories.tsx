import type { Meta, StoryObj } from '@storybook/react-vite'

import Border from '.'

const meta = {
  title: 'components/Border',
  component: Border,
  tags: ['autodocs'],
  args: {
    height: 1,
  },
} satisfies Meta<typeof Border>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
