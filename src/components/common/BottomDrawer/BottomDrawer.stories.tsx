import type { Meta, StoryObj } from '@storybook/react-vite'
import BottomDrawer from '.'
import { expect, fn } from 'storybook/test'

const meta = {
  title: 'components/BottomDrawer',
  component: BottomDrawer,
  args: {
    isOpen: true,
    close: () => {},
  },
} satisfies Meta<typeof BottomDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div style={{ padding: '20px' }}>Bottom Drawer Content</div>,
    close: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const closeButton = await canvas.findByTestId('modal-background')
    await userEvent.click(closeButton)
    await expect(args.close).toHaveBeenCalled()
  },
}
