import type { Meta, StoryObj } from '@storybook/react-vite'
import MbtiChart from './MbtiChart'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  title: 'components/guest book/MbtiChart',
  component: MbtiChart,
  tags: ['autodocs'],

  decorators: [withRouter],
} satisfies Meta<typeof MbtiChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
