import type { Meta, StoryObj } from '@storybook/react-vite'
import Profile from './Profile'
import { MEMBERS } from '@/consts/MEMBERS'

const meta = {
  title: 'components/Profile',
  component: Profile,
} satisfies Meta<typeof Profile>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: MEMBERS[0].id,
    name: MEMBERS[0].name,
    imageUrl: MEMBERS[0].imageUrl,
    badgeId: MEMBERS[0].badgeId,
    description: MEMBERS[0].description,
  },
  render: props => {
    const { id, name, imageUrl, badgeId, description } = props
    return (
      <div
        style={{
          backgroundColor: '#fff',
        }}
      >
        <Profile
          id={id}
          name={name}
          imageUrl={imageUrl}
          badgeId={badgeId}
          description={description}
        />
      </div>
    )
  },
}
