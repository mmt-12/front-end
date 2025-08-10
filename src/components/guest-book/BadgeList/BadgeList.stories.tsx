import type { Meta, StoryObj } from '@storybook/react-vite'
import BadgeList from './BadgeList'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  title: 'components/guest book/BadgeList',
  component: BadgeList,
  tags: ['autodocs'],

  decorators: [withRouter],
} satisfies Meta<typeof BadgeList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
}
