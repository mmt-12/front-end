import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import DateInputField from './DateInputField'

const meta = {
  title: 'components/DateInputField',
  component: DateInputField,
  tags: ['autodocs'],
  args: {
    label: '입력 텍스트',
    onChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const inputs = await canvas.findAllByRole('textbox')
    await userEvent.clear(inputs[0])
    await userEvent.clear(inputs[1])
    await userEvent.clear(inputs[2])
    await userEvent.type(inputs[0], '1999')
    await userEvent.type(inputs[1], '11')
    await userEvent.type(inputs[2], '08')
    await expect(args.onChange).toHaveBeenCalled()
    await expect(args.onChange).toHaveBeenLastCalledWith(new Date(1999, 10, 8))
  },
} satisfies Meta<typeof DateInputField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '기본 입력 필드',
  },
}
