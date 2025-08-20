import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'

import { NOTIFICATIONS } from '@/mocks/data/notifications'
import NotificationItem from '.'

const meta = {
  title: 'components/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  args: NOTIFICATIONS[1],
  decorators: [withRouter],
} satisfies Meta<typeof NotificationItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
