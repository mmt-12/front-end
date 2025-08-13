import type { Meta, StoryObj } from '@storybook/react-vite'
import MemoryListItem from './MemoryListItem'
import { withRouter } from 'storybook-addon-remix-react-router'
import { MEMORIES } from '@/mocks/data/memories'

const meta = {
  title: 'components/memory/MemoryListItem',
  component: MemoryListItem,
  args: MEMORIES[0],
  decorators: [withRouter],
} satisfies Meta<typeof MemoryListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
