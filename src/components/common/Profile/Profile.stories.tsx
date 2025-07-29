import type { Meta, StoryObj } from '@storybook/react-vite'
import Profile from './Profile'
import { MEMBERS } from '@/mocks/data/MEMBERS'
import { expect } from 'storybook/test'

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
  args: {
    name: MEMBERS[0].name,
    imageUrl: MEMBERS[0].imageUrl,
    badgeId: MEMBERS[0].badgeId,
    description: MEMBERS[0].description,
  },
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
