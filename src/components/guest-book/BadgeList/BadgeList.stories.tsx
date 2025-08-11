import type { Meta, StoryObj } from '@storybook/react-vite'
import BadgeList from './BadgeList'

const meta = {
  title: 'components/guest book/BadgeList',
  component: BadgeList,
  tags: ['autodocs'],
} satisfies Meta<typeof BadgeList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
}
