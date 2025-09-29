import type { Meta, StoryObj } from '@storybook/react-vite'
import { POSTS } from 'mock/data/posts'
import { withRouter } from 'storybook-addon-remix-react-router'

import PostListItem from './PostListItem'

const meta = {
  title: 'components/memory/Post',
  component: PostListItem,
  args: POSTS[0],
  decorators: [withRouter],
} satisfies Meta<typeof PostListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
