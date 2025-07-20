import type { Meta, StoryObj } from '@storybook/react'
import NavBar from '.'
import { withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  title: 'components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    reactRouter: {
      routePath: '/memories',
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof NavBar>

export default meta

type Story = StoryObj<typeof meta>

export const MemoriesPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '/memories',
    },
  },
  render: () => (
    <div style={{ pointerEvents: 'none' }}>
      <NavBar />
    </div>
  ),
}

export const MapPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '/map',
    },
  },
  render: () => (
    <div style={{ pointerEvents: 'none' }}>
      <NavBar />
    </div>
  ),
}

export const CalendarPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '/calendar',
    },
  },
  render: () => (
    <div style={{ pointerEvents: 'none' }}>
      <NavBar />
    </div>
  ),
}

export const GuestBookPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '/guest-book',
    },
  },
  render: () => (
    <div style={{ pointerEvents: 'none' }}>
      <NavBar />
    </div>
  ),
}
