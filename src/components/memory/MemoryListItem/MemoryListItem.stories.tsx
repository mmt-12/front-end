import type { Meta, StoryObj } from '@storybook/react-vite'
import MemoryListItem from './MemoryListItem'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  title: 'components/memory/MemoryListItem',
  component: MemoryListItem,
  args: {
    id: 'memory-1',
    title: '양평 엠티',
    location: '경기도 양평시 양평군',
    startDate: '2025.06.20',
    endDate: '2025.06.21',
    images: [
      '/test_images/image1.png',
      '/test_images/image2.png',
      '/test_images/image3.png',
    ],
    memberCount: 5,
    imageCount: 10,
  },
  decorators: [withRouter],
} satisfies Meta<typeof MemoryListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
