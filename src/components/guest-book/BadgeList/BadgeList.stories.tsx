import type { Meta, StoryObj } from '@storybook/react-vite'

import BadgeList from './BadgeList'

const meta = {
  title: 'components/guest book/BadgeList',
  component: BadgeList,
  tags: ['autodocs'],
  args: {
    associateId: 1,
    communityId: 1,
  },
} satisfies Meta<typeof BadgeList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
}
