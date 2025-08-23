import { UserRounded } from '@solar-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import SearchBar from './SearchBar'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  args: {
    onChange: () => {},
    icon: UserRounded,
    count: 123,
  },
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
