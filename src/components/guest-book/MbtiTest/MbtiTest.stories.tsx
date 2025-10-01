import type { Meta, StoryObj } from '@storybook/react-vite'

import MbtiTest from './MbtiTest'

const meta = {
  title: 'components/guest book/MbtiTest',
  component: MbtiTest,
  tags: ['autodocs'],
  args: {
    isMyPage: false,
    name: '이름',
    communityId: 1,
    associateId: 1,
  },
} satisfies Meta<typeof MbtiTest>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
