import type { Meta, StoryObj } from '@storybook/react-vite'
import WavyBox from '.'
import { expect } from 'storybook/test'

const meta = {
  title: 'components/WavyBox',
  component: WavyBox,
  tags: ['autodocs'],
  args: {
    strokeColor: 'rgb(0, 0, 0)',
    strokeWidth: 2,
    children: <p>내부 컨텐츠입니다.</p>,
  },
  play: async ({ canvas, args }) => {
    const wavyRect = await canvas.findByTestId('wavy-rect')
    expect(wavyRect).toBeInTheDocument()
    expect(wavyRect).toHaveStyle({
      stroke: args.strokeColor,
      strokeWidth: `${args.strokeWidth}px`,
    })
  },
} satisfies Meta<typeof WavyBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
