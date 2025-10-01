import type { Meta, StoryObj } from '@storybook/react-vite'

import Popup from '.'

const meta = {
  title: 'components/popup/Popup',
  component: Popup,
} satisfies Meta<typeof Popup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Popup Modal Title',
    children: <div>Popup Modal Content</div>,
    onClose: () => console.log('Modal closed'),
  },
}
