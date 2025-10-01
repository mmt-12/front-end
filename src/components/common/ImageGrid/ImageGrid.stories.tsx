import type { Meta, StoryObj } from '@storybook/react-vite'
import { POSTS } from 'mock/data/posts'

import ImageGrid from './ImageGrid'

const meta = {
  title: 'components/ImageGrid',
  component: ImageGrid,
  tags: ['autodocs'],
  args: {
    images: POSTS[0].pictures,
    onImageClick: () => {},
    selectedImage: '',
  },
} satisfies Meta<typeof ImageGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
