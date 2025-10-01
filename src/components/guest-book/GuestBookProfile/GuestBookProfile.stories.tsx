import type { Meta, StoryObj } from '@storybook/react-vite'
import { PROFILE } from 'mock/data/guestBook'
import { withRouter } from 'storybook-addon-remix-react-router'

import GuestBookProfile from './GuestBookProfile'

const meta = {
  title: 'components/guest book/GuestBookProfile',
  component: GuestBookProfile,
  tags: ['autodocs'],
  args: {
    nickname: PROFILE.nickname,
    achievementId: PROFILE.achievement.id,
    imageUrl: PROFILE.imageUrl,
    introduction: PROFILE.introduction,
    birthday: PROFILE.birthday,
  },
  decorators: [withRouter],
} satisfies Meta<typeof GuestBookProfile>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 0,
    isMyProfile: true,
  },
}
