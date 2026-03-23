import type { Meta, StoryObj } from '@storybook/react-vite'

import { MEMORIES } from '@/../mock/data/memories'
import MemoryListItem from './MemoryListItem'

const meta = {
  title: 'components/memory/MemoryListItem',
  component: MemoryListItem,
  args: MEMORIES[0],
} satisfies Meta<typeof MemoryListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
