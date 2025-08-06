import type { Meta, StoryObj } from '@storybook/react-vite'
import Album from './Album'

const meta = {
  title: 'components/Album',
  component: Album,
  tags: ['autodocs'],
  args: {
    images: [
      '/test_images/image1.png',
      '/test_images/image2.png',
      '/test_images/image3.png',
    ],
  },
} satisfies Meta<typeof Album>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultAlbum: Story = {}
