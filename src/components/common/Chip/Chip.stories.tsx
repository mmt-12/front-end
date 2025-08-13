import type { Meta, StoryObj } from '@storybook/react-vite'
import Chip from '.'
import { UserCircle } from '@solar-icons/react'
import { fn } from 'storybook/internal/test'

const meta = {
  title: 'components/Chip',
  component: Chip,
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '10',
    Icon: UserCircle,
  },
}

export const Clickable: Story = {
  args: {
    label: '20',
    Icon: UserCircle,
    onClick: fn(),
  },
}
