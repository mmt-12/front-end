import type { Meta, StoryObj } from '@storybook/react-vite'
import { Profile } from '@/mocks/data/guestBook'
import GuestBookProfile from './GuestBookProfile'

const meta = {
  title: 'components/guest book/GuestBookProfile',
  component: GuestBookProfile,
  tags: ['autodocs'],
  args: {
    nickname: Profile.nickname,
    achievementId: Profile.achievement.id,
    imagePath: Profile.imagePath,
    introduction: Profile.introduction,
    birthday: Profile.birthday,
  },
} satisfies Meta<typeof GuestBookProfile>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
