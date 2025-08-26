import type { Meta, StoryObj } from '@storybook/react-vite'

import { POST } from '@/mocks/data/post'
import Img from '../Img'
import Album from './Album'

const meta = {
  title: 'components/Album',
  component: Album,
  tags: ['autodocs'],
  args: {
    children: POST.images.map((image, index) => (
      <div key={index}>
        <Img src={image} alt={`Album image ${index}`} />
      </div>
    )),
  },
} satisfies Meta<typeof Album>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultAlbum: Story = {}
