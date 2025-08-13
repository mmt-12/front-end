import type { Meta, StoryObj } from '@storybook/react-vite'
import Profile from './Profile'
import { expect } from 'storybook/test'
import { MEMBERS } from '@/mocks/data/members'

const meta = {
  title: 'components/Profile',
  component: Profile,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/kxbeh4EkC4NhVPkWIdGo9V/MEMENTO?node-id=217-6296&t=5Vamg9HKbWn370H8-1',
    },
  },
} satisfies Meta<typeof Profile>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: MEMBERS[0],
  play: async ({ args, canvas }) => {
    expect(canvas.getByText(args.name)).toBeInTheDocument()

    if (args.description)
      expect(canvas.getByText(args.description)).toBeInTheDocument()

    if (args.imageUrl)
      expect(canvas.getByRole('img')).toHaveAttribute('src', args.imageUrl)
    if (args.badgeId) {
      const badge = canvas.getByTestId(`badge-${args.badgeId}`)
      expect(badge).toBeInTheDocument()
    }
  },
}

export const Small: Story = {
  args: {
    ...MEMBERS[1],
    size: 'sm',
  },
}
