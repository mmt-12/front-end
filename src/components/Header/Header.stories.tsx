import type { Meta, StoryObj } from '@storybook/react-vite'
import Header from '.'
import { useHeaderStore } from '@/store/headerStore'
import { useEffect } from 'react'
import { Bell, UsersGroupRounded } from '@solar-icons/react'

const meta = {
  title: 'components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    routeName: '페이지 제목',
    leftItem: {
      icon: <UsersGroupRounded size={24} weight='Bold' />, // Replace with actual icon component
      onClick: () => console.log('Left clicked'),
    },
    rightItem: {
      icon: <Bell size={24} weight='Bold' />, // Replace with actual icon component
      onClick: () => console.log('Right clicked'),
    },
  },
  render: args => {
    const { setRouteName, setLeftItem, setRightItem } = useHeaderStore(
      state => state,
    )
    useEffect(() => {
      setRouteName('페이지 제목')
      setLeftItem({
        icon: <UsersGroupRounded size={24} weight='Bold' />, // Replace with actual icon component
        onClick: () => console.log('Left clicked'),
      })
      setRightItem({
        icon: <Bell size={24} weight='Bold' />, // Replace with actual icon component
        onClick: () => console.log('Right clicked'),
      })
    }, [])
    return <Header {...args} />
  },
}
