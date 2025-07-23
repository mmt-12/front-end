import type { Meta, StoryObj } from '@storybook/react-vite'
import DateRangeSelector from './DateRangeSelector'

const meta = {
  title: 'components/popup/DateRangeSelector',
  component: DateRangeSelector,
  args: {
    onSelect: '(_range: any) => void' as unknown as any,
  },
} satisfies Meta<typeof DateRangeSelector>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSelect: range => console.log('Selected range:', range),
  },
}
