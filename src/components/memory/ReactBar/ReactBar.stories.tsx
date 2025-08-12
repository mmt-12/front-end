import type { Meta, StoryObj } from '@storybook/react-vite'
import ReactBar from './ReactBar'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  title: 'components/memory/ReactBar',
  component: ReactBar,
  decorators: [withRouter],
} satisfies Meta<typeof ReactBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
