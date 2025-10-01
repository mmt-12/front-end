import type { Meta, StoryObj } from '@storybook/react-vite'

import Emoji from '.'

const meta = {
  title: 'components/Emoji',
  component: Emoji,
  tags: ['autodocs'],
} satisfies Meta<typeof Emoji>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    id: 1,
    url: '/test_images/image1.png',
    name: 'Smile',
    onClick: e => {
      e.stopPropagation()
      console.log(`Clicked on emoji`)
    },
  },
}

export const Reacted: Story = {
  args: {
    size: 'md',
    id: 2,
    url: '/test_images/image2.png',
    name: 'Laugh',
    involved: true,
    onClick: e => {
      e.stopPropagation()
      console.log(`Clicked on emoji`)
    },
  },
}

export const WithAmount: Story = {
  args: {
    size: 'md',
    id: 3,
    url: '/test_images/image3.png',
    name: 'Heart',
    onClick: e => {
      e.stopPropagation()
      console.log(`Clicked on emoji`)
    },
  },
}

export const Active: Story = {
  args: {
    size: 'md',
    id: 3,
    url: '/test_images/image3.png',
    name: 'Heart',
    isActive: true,
    onClick: e => {
      e.stopPropagation()
      console.log(`Clicked on emoji`)
    },
  },
}
