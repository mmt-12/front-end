import type { Meta, StoryObj } from '@storybook/react-vite'
import GuestBookProfile from './GuestBookProfile'
import { withRouter } from 'storybook-addon-remix-react-router'
import { PROFILE } from '@/mocks/data/guestBook'

const meta = {
  title: 'components/guest book/GuestBookProfile',
  component: GuestBookProfile,
  tags: ['autodocs'],
  args: {
    nickname: PROFILE.nickname,
    achievementId: PROFILE.achievement.id,
    imagePath: PROFILE.imagePath,
    introduction: PROFILE.introduction,
    birthday: PROFILE.birthday,
  },
  decorators: [withRouter],
} satisfies Meta<typeof GuestBookProfile>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isMyProfile: true,
  },
}
