import type { Meta, StoryObj } from '@storybook/react-vite'
import Header from '.'
import { useHeaderStore } from '@/store/headerStore'
import { useEffect } from 'react'
import { Bell, UsersGroupRounded } from '@solar-icons/react'
import { expect, fn } from 'storybook/test'

const meta = {
  title: 'components/Header',
  component: Header,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

const routeName = '페이지 제목'

export const Default: Story = {
  render: () => {
    const { setRouteName, setLeftItem, setRightItem } = useHeaderStore(
      state => state,
    )
    useEffect(() => {
      setRouteName(routeName)
      setLeftItem({
        icon: UsersGroupRounded, // Replace with actual icon component
        onClick: fn(),
      })
      setRightItem({
        icon: Bell, // Replace with actual icon component
        onClick: fn(),
      })
    }, [setRouteName, setLeftItem, setRightItem])
    return <Header />
  },
  play: async ({ canvas }) => {
    const canvasElement = await canvas.findByText(routeName)
    expect(canvasElement).toBeInTheDocument()

    const headerItems = await canvas.findAllByTestId('header-item')
    expect(headerItems).toHaveLength(2)
    headerItems.forEach(async item => {
      expect(item).toBeInTheDocument()
      expect(item).toBeEnabled()
      expect(item).toHaveRole('button')
    })
  },
}
