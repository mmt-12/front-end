import { useState } from 'react'
import {
  CalendarMinimalistic,
  Map,
  MedalRibbonStar,
  UserRounded,
  UsersGroupTwoRounded,
} from '@solar-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import Badge from '@/components/common/Badge'
import Profile from '@/components/common/Profile'
import { BADGES } from '@/consts/BADGES'
import { MEMBERS } from '@/mocks/data/members'
import type { IArrayInput, IDateRangeInput, ILocationInput } from '@/types'
import ArraySelector from '../ArraySelector'
import DateRangeSelector from '../DateRangeSelector'
import MapLocationSelector from '../MapLocationSelector'
import InputPopup from './InputPopup'

const meta = {
  title: 'components/popup/InputPopup',
  component: InputPopup,
  tags: ['autodocs'],
  play: async ({ canvas, args }) => {
    const label = await canvas.findByText(args.label)
    expect(label).toBeInTheDocument()
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
  render: () => {
    const [dateRange, setDateRange] = useState<IDateRangeInput>()
    return (
      <InputPopup
        label='날짜 선택'
        value={dateRange}
        onChange={ds => setDateRange(ds as IDateRangeInput)}
        icon={CalendarMinimalistic}
        content={<DateRangeSelector onSelect={setDateRange} />}
      />
    )
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
  render: () => {
    const [location, setLocation] = useState<ILocationInput>()
    return (
      <InputPopup
        label='위치 선택'
        value={location}
        onChange={setLocation}
        icon={Map}
        content={<MapLocationSelector />}
      />
    )
  },
}

export const Array: Story = {
  args: {
    label: '배열 선택',
    onChange: value => console.log('Input changed:', value),
    icon: MedalRibbonStar,
    content: (
      <ArraySelector
        searchBarIcon={MedalRibbonStar}
        renderPreview
        items={Object.entries(BADGES).map(([id, badge]) => ({
          id: Number(id),
          label: badge.name,
          render: () => <Badge id={Number(id)} />,
        }))}
        onSelect={val => console.log('선택된 아이템:', val)}
      />
    ),
  },
  render: () => {
    const [selectedItems, setSelectedItems] = useState<IArrayInput>()
    return (
      <InputPopup
        label='배열 선택'
        value={selectedItems}
        onChange={setSelectedItems}
        icon={MedalRibbonStar}
        content={
          <ArraySelector
            searchBarIcon={MedalRibbonStar}
            renderPreview
            items={Object.entries(BADGES).map(([id, badge]) => ({
              id: Number(id),
              label: badge.name,
              render: () => <Badge id={Number(id)} />,
            }))}
          />
        }
      />
    )
  },
}

export const MultipleArray: Story = {
  args: {
    label: '다중 배열 선택',
    onChange: value => console.log('Input changed:', value),
    icon: UsersGroupTwoRounded,
    content: (
      <ArraySelector
        searchBarIcon={UserRounded}
        multiple
        items={MEMBERS.map(member => ({
          id: member.id,
          label: member.name,
          render: () => <Profile {...member} />,
        }))}
      />
    ),
  },
  render: () => {
    const [selectedItems, setSelectedItems] = useState<IArrayInput>()
    return (
      <InputPopup
        label='다중 배열 선택'
        value={selectedItems}
        onChange={setSelectedItems}
        icon={UsersGroupTwoRounded}
        content={
          <ArraySelector
            searchBarIcon={UserRounded}
            multiple
            items={MEMBERS.map(member => ({
              id: member.id,
              label: member.name,
              render: () => <Profile {...member} />,
            }))}
          />
        }
      />
    )
  },
}
