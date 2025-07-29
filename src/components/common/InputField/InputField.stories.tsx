import type { Meta, StoryObj } from '@storybook/react-vite'
import InputField from './InputField'
import { expect, fn } from 'storybook/test'

const meta = {
  title: 'components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: '입력 텍스트',
    onChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = await canvas.findByRole('textbox')
    await userEvent.type(input, '테스트 입력')
    await expect(args.onChange).toHaveBeenCalled()
    await expect(args.onChange).toHaveBeenLastCalledWith('테스트 입력')
    await expect(input).toBeEnabled()
  },
} satisfies Meta<typeof InputField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '기본 입력 필드',
  },
}

export const LargeInput: Story = {
  args: {
    label: '큰 입력 필드',
    size: 'lg',
  },
}
