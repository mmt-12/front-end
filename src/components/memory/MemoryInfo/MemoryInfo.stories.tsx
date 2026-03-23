import type { Meta, StoryObj } from '@storybook/react-vite'

import { MEMORIES } from '@/../mock/data/memories'
import MemoryInfo from './MemoryInfo'

const meta = {
  title: 'components/memory/MemoryInfo',
  component: MemoryInfo,
  args: MEMORIES[0],
} satisfies Meta<typeof MemoryInfo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
