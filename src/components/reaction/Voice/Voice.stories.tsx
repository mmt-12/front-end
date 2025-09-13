import type { Meta, StoryObj } from '@storybook/react-vite'

import Voice from '.'

const meta = {
  title: 'components/Voice',
  component: Voice,
  tags: ['autodocs'],
} satisfies Meta<typeof Voice>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    id: 1,
    url: '/test_voices/voice1.mp3',
    name: '하.하.하.하.하',
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on Voice with id: ${id}`)
    },
  },
}

export const Reacted: Story = {
  args: {
    size: 'md',
    id: 2,
    url: '/test_voices/voice2.mp3',
    name: '하.하.하.하.하',
    involved: true,
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on Voice with id: ${id}`)
    },
  },
}

export const WithAmount: Story = {
  args: {
    size: 'md',
    id: 3,
    url: '/test_voices/voice3.mp3',
    name: '하.하.하.하.하',
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on Voice with id: ${id}`)
    },
  },
}

export const Active: Story = {
  args: {
    size: 'md',
    id: 3,
    url: '/test_voices/voice3.mp3',
    name: '하.하.하.하.하',
    isActive: true,
    onClick: (e, id) => {
      e.stopPropagation()
      console.log(`Clicked on Voice with id: ${id}`)
    },
  },
}
