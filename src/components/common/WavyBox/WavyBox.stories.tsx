import type { Meta, StoryObj } from '@storybook/react'
import WavyBox from '.'

const meta = {
  title: 'components/WavyBox',
  component: WavyBox,
  tags: ['autodocs'],
  args: {
    strokeColor: 'black',
    strokeWidth: 2,
    children: <p>내부 컨텐츠입니다.</p>,
  },
} satisfies Meta<typeof WavyBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
