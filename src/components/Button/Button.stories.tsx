import type { Meta, StoryObj } from '@storybook/react'
import Button from '.'
import { Box, GalleryAdd } from '@solar-icons/react'
import { theme } from '@/styles/theme'

const meta = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: '버튼 텍스트',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const PrimaryButton: Story = {
  args: {
    type: 'primary',
  },
}

export const SecondaryButton: Story = {
  args: {
    type: 'secondary',
  },
}

export const DisabledButton: Story = {
  args: {
    type: 'disabled',
  },
}

export const SmallButton: Story = {
  args: {
    size: 'sm',
  },
}

export const MediumButton: Story = {
  args: {
    size: 'md',
    type: 'secondary',
    icon: <Box size={28} weight='Bold' color={theme.sky[500]} />,
  },
}

export const LargeButton: Story = {
  args: {
    label: '',
    size: 'lg',
    type: 'secondary',
    icon: <GalleryAdd size={60} weight='Bold' color={theme.sky[600]} />,
  },
}

export const FullButton: Story = {
  args: {
    size: 'full',
  },
}
