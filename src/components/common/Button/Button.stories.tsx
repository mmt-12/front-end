import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from '.'
import { Box, GalleryAdd } from '@solar-icons/react'
import { theme } from '@/styles/theme'
import { expect, fn } from 'storybook/test'

const meta = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: '버튼 텍스트',
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = await canvas.findByRole('button')
    await userEvent.click(button)

    await expect(args.onClick).toHaveBeenCalled()
    await expect(button).toBeEnabled()
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const PrimaryButton: Story = {
  args: {
    type: 'primary',
    onClick: fn(),
  },
}

export const SecondaryButton: Story = {
  args: {
    type: 'secondary',
    onClick: fn(),
  },
}

export const DisabledButton: Story = {
  args: {
    type: 'disabled',
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = await canvas.findByRole('button')
    await userEvent.click(button)

    await expect(args.onClick).not.toHaveBeenCalled()
    await expect(button).toBeDisabled()
  },
}

export const SmallButton: Story = {
  args: {
    size: 'sm',
    onClick: fn(),
  },
}

export const MediumButton: Story = {
  args: {
    size: 'md',
    type: 'secondary',
    icon: <Box size={28} weight='Bold' color={theme.sky[500]} />,
    onClick: fn(),
  },
}

export const LargeButton: Story = {
  args: {
    label: '',
    size: 'lg',
    type: 'secondary',
    icon: <GalleryAdd size={60} weight='Bold' color={theme.sky[600]} />,
    onClick: fn(),
  },
}

export const FullButton: Story = {
  args: {
    size: 'full',
    onClick: fn(),
  },
}
