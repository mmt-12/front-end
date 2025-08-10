import type { Meta, StoryObj } from '@storybook/react-vite'
import WavyButton from '.'

const meta = {
  title: 'components/guest book/WavyButton',
  component: WavyButton,
  tags: ['autodocs'],
  args: {
    label: '버튼 텍스트',
  },
} satisfies Meta<typeof WavyButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
