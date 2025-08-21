import type { Meta, StoryObj } from '@storybook/react-vite'

import Spacing from '.'

const meta = {
  title: 'components/Spacing',
  component: Spacing,
  tags: ['autodocs'],
  args: {
    height: 10,
  },
} satisfies Meta<typeof Spacing>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div css={{ padding: '32px', backgroundColor: '#f0f0f0' }}>
      <p>space between A</p>
      <Spacing {...args} />
      <p>and B</p>
    </div>
  ),
}
