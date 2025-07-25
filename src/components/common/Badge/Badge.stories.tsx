import type { Meta, StoryObj } from '@storybook/react-vite'
import Badge from '.'

const meta = {
  title: 'components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    id: 1,
  },
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const AllBadges: Story = {
  args: { id: 1 },
  render: () => {
    const badgeIds = Array.from({ length: 33 }, (_, i) => i + 1)

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {badgeIds.map(id => (
          <Badge key={id} id={id} />
        ))}
      </div>
    )
  },
}
