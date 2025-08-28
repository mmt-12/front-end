import type { Meta, StoryObj } from '@storybook/react-vite'

import Img from './Img'

const meta = {
  title: 'components/Img',
  component: Img,
  tags: ['autodocs'],
  args: {
    alt: 'image',
    src: '/test_images/image1.png',
    width: 320,
    height: 320,
  },
} satisfies Meta<typeof Img>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Error: Story = {
  args: {
    src: '잘못된 이미지 경로',
  },
}
