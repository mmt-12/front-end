import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'

import { MEMORIES } from '@/../mock/data/memories'
import MemoryListItem from './MemoryListItem'

const meta = {
  title: 'components/memory/MemoryListItem',
  component: MemoryListItem,
  args: MEMORIES[0],
  decorators: [withRouter],
} satisfies Meta<typeof MemoryListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
