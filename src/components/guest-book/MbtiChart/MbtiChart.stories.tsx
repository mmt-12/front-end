import type { Meta, StoryObj } from '@storybook/react-vite'

import MbtiChart from './MbtiChart'

const meta = {
  title: 'components/guest book/MbtiChart',
  component: MbtiChart,
  tags: ['autodocs'],
  args: {
    communityId: 1,
    associateId: 1,
  },
  decorators: [
    Story => (
      <div style={{ width: 200, height: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MbtiChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
