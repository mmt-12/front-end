import type { Meta, StoryObj } from '@storybook/react-vite'
import Post from './Post'
import { withRouter } from 'storybook-addon-remix-react-router'
import { POST } from '@/mocks/data/post'

const meta = {
  title: 'components/memory/Post',
  component: Post,
  args: POST,
  decorators: [withRouter],
} satisfies Meta<typeof Post>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
