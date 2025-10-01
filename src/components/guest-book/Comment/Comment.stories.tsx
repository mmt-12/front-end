import type { Meta, StoryObj } from '@storybook/react-vite'
import { GUEST_BOOK } from 'mock/data/guestBook'

import Comment from '.'

const meta = {
  title: 'components/guest book/Comment',
  component: Comment,
  tags: ['autodocs'],
} satisfies Meta<typeof Comment>

export default meta

type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    ...GUEST_BOOK.filter(comment => comment.type === 'TEXT')[0],
  },
}

export const Emoji: Story = {
  args: {
    ...GUEST_BOOK.filter(comment => comment.type === 'EMOJI')[0],
  },
}

export const Voice: Story = {
  args: {
    ...GUEST_BOOK.filter(comment => comment.type === 'VOICE')[0],
  },
}
