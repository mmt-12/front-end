import type { Meta, StoryObj } from '@storybook/react-vite'

import { POST } from '@/mocks/data/post'
import ImageGrid from './ImageGrid'

const meta = {
  title: 'components/ImageGrid',
  component: ImageGrid,
  tags: ['autodocs'],
  args: {
    images: POST.images,
    onImageClick: () => {},
    selectedImage: '',
  },
} satisfies Meta<typeof ImageGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
