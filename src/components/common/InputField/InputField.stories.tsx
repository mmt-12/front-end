import type { Meta, StoryObj } from '@storybook/react-vite'
import InputField from './InputField'

const meta = {
  title: 'components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: '입력 텍스트',
  },
} satisfies Meta<typeof InputField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '기본 입력 필드',
    onChange: value => {
      console.log('입력된 값:', value)
    },
  },
}

export const LargeInput: Story = {
  args: {
    label: '큰 입력 필드',
    size: 'lg',
    onChange: value => {
      console.log('입력된 값:', value)
    },
  },
}
