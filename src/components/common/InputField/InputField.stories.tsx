import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import InputField from './InputField'

const meta = {
  title: 'components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: '입력 텍스트',
    type: 'input',
    value: '',
    onChange: () => {},
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
  render: () => {
    const [value, setValue] = useState('')
    return <InputField value={value} onChange={e => setValue(e.target.value)} />
  },
}

export const LargeInput: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <InputField
        value={value}
        onChange={e => setValue(e.target.value)}
        type='textarea'
      />
    )
  },
}
