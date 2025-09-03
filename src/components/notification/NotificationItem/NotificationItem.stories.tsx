import type { Meta, StoryObj } from '@storybook/react-vite'
import { NOTIFICATIONS } from 'mock/data/notifications'
import { withRouter } from 'storybook-addon-remix-react-router'

import NotificationItem from '.'

const meta = {
  title: 'components/notification/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  args: NOTIFICATIONS[1],
  decorators: [withRouter],
} satisfies Meta<typeof NotificationItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
