import type { Meta, StoryObj } from '@storybook/react-vite'
import PopupModal from '.'

const meta = {
  title: 'components/PopupModal',
  component: PopupModal,
  tags: ['autodocs'],
} satisfies Meta<typeof PopupModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Popup Modal Title',
    children: <div>Popup Modal Content</div>,
    onClose: () => console.log('Modal closed'),
  },
}
