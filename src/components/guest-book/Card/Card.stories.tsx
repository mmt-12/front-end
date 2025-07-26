import type { Meta, StoryObj } from '@storybook/react'
import Card from '.'

const meta = {
  title: 'components/guest book/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'TITLE',
    children: <p>내부 컨텐츠입니다.</p>,
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
