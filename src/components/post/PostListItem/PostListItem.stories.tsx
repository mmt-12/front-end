import type { Meta, StoryObj } from '@storybook/react-vite'
import { POSTS } from 'mock/data/posts'

import PostListItem from './PostListItem'

const meta = {
  title: 'components/memory/Post',
  component: PostListItem,
  args: POSTS[0],
} satisfies Meta<typeof PostListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    route: `/memory/1/post/${POSTS[0].id}`, // 👈 matches your param
    path: '/memory/:memoryId/post/:postId', // 👈 must match your router
  },
}
