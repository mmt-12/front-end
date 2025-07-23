import type { Meta, StoryObj } from '@storybook/react-vite'
import InputPopup from './InputPopup'
import { CalendarMinimalistic, Map } from '@solar-icons/react'
import DateRangeSelector from '../DateRangeSelector'
import MapLocationSelector from '../MapLocationSelector'

const meta = {
  title: 'components/popup/InputPopup',
  component: InputPopup,
  args: {
    label: 'Select Input',
    onChange: '(_value: any) => void' as unknown as any,
    icon: Map,
    content: <></>,
  },
} satisfies Meta<typeof InputPopup>

export default meta

type Story = StoryObj<typeof meta>

export const Date: Story = {
  args: {
    label: '날짜 선택',
    onChange: value => console.log('Input changed:', value),
    icon: CalendarMinimalistic,
    content: (
      <DateRangeSelector onSelect={val => console.log('선택된 날짜:', val)} />
    ),
  },
}

export const Location: Story = {
  args: {
    label: '위치 선택',
    onChange: value => console.log('Input changed:', value),
    icon: Map,
    content: (
      <MapLocationSelector onSelect={val => console.log('선택된 위치:', val)} />
    ),
  },
}
