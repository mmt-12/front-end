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
    id: '1',
    url: '/test_images/image1.png',
    name: 'Smile',
    amount: undefined,
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on emoji with id: ${id}`)
    },
  },
}

export const Reacted: Story = {
  args: {
    size: 'md',
    id: '2',
    url: '/test_images/image2.png',
    name: 'Laugh',
    iReacted: true,
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on emoji with id: ${id}`)
    },
  },
}

export const WithAmount: Story = {
  args: {
    size: 'md',
    id: '3',
    url: '/test_images/image3.png',
    name: 'Heart',
    amount: 10,
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on emoji with id: ${id}`)
    },
  },
}

export const Active: Story = {
  args: {
    size: 'md',
    id: '3',
    url: '/test_images/image3.png',
    name: 'Heart',
    amount: 5,
    isActive: true,
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on emoji with id: ${id}`)
    },
  },
}
