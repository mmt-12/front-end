import type { Meta, StoryObj } from '@storybook/react-vite'
import NavBar from '.'
import { withRouter } from 'storybook-addon-remix-react-router'
import { expect } from 'storybook/test'

const meta = {
  title: 'components/NavBar',
  component: NavBar,
  parameters: {
    reactRouter: {
      routePath: '*',
    },
  },
  decorators: [withRouter],
  play: async ({ canvas, userEvent }) => {
    // Click on a button and assert that a dialog appears
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    const buttons = canvas.getAllByRole('button')
    await expect(buttons).toHaveLength(5)
    await expect(buttons[1]).toHaveTextContent('기억')
    await expect(buttons[2]).toHaveTextContent('이모티콘')
    await expect(buttons[3]).toHaveTextContent('약속')
    await expect(buttons[4]).toHaveTextContent('보이스')
  },
} satisfies Meta<typeof NavBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
