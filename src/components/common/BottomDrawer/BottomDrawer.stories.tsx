import type { Meta, StoryObj } from '@storybook/react-vite'

import BottomDrawer from '.'

const meta = {
  title: 'components/BottomDrawer',
  component: BottomDrawer,
  args: {
  },
} satisfies Meta<typeof BottomDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div style={{ padding: '20px' }}>Bottom Drawer Content</div>,
  },
}
