import type { Meta, StoryObj } from '@storybook/react-vite'

import Text from '.'

const meta = {
  title: 'components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'This is a text component',
    withPadding: true,
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
