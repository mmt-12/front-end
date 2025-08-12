import type { Meta, StoryObj } from '@storybook/react-vite'
import MemoryInfo from './MemoryInfo'
import { withRouter } from 'storybook-addon-remix-react-router'
import { MEMORIES } from '@/mocks/data/memories'

const meta = {
  title: 'components/memory/MemoryInfo',
  component: MemoryInfo,
  args: MEMORIES[0],
  decorators: [withRouter],
} satisfies Meta<typeof MemoryInfo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
