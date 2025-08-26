import type { Meta, StoryObj } from '@storybook/react-vite'

import { PROFILE_IMAGES } from '@/mocks/data/profileImages'
import ImageGrid from './ImageGrid'

const meta = {
  title: 'components/ImageGrid',
  component: ImageGrid,
  tags: ['autodocs'],
  args: {
    images: PROFILE_IMAGES,
    onImageClick: () => {},
    selectedImage: '',
  },
} satisfies Meta<typeof ImageGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
