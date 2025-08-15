import type { Meta, StoryObj } from '@storybook/react-vite'
import Album from './Album'
import { POST } from '@/mocks/data/post'

const meta = {
  title: 'components/Album',
  component: Album,
  tags: ['autodocs'],
  args: {
    children: POST.images.map((image, index) => (
      <div key={index}>
        <img src={image} alt={`Album image ${index}`} />
      </div>
    )),
  },
} satisfies Meta<typeof Album>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultAlbum: Story = {}
