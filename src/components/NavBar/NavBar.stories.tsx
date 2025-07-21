import type { Meta, StoryObj } from '@storybook/react-vite'
import NavBar from '.'
import { withRouter } from 'storybook-addon-react-router-v6'
import { ROUTES } from '@/routes/ROUTES'

const meta = {
  title: 'components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    reactRouter: {
      routePath: ROUTES.MEMORY_LIST,
    },
  },
  decorators: [
    withRouter,
    Story => (
      <div style={{ pointerEvents: 'none' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavBar>

export default meta

type Story = StoryObj<typeof meta>

export const MemoriesPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: ROUTES.MEMORY_LIST,
    },
  },
}

export const MapPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: ROUTES.MAP,
    },
  },
}

export const CalendarPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: ROUTES.CALENDAR,
    },
  },
}

export const GuestBookPage: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: ROUTES.GUEST_BOOK,
    },
  },
}
