import { useState } from 'react'
import {
  CalendarMinimalistic,
  Map,
  MedalRibbonStar,
  UserRounded,
  UsersGroupTwoRounded,
} from '@solar-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MEMBERS } from 'mock/data/members'
import { expect } from 'storybook/test'

import type { Achievement } from '@/api'
import Badge from '@/components/common/Badge'
import Profile from '@/components/member/Profile'
import { BADGES } from '@/consts/BADGES'
import type { IDateRangeInput, ILocationInput, IMember } from '@/types'
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
    content: <DateRangeSelector />,
    render: () => <></>,
  },
  render: () => {
    const [dateRange, setDateRange] = useState<IDateRangeInput>()
    return (
      <InputPopup
        label='날짜 선택'
        value={dateRange}
        onChange={ds => setDateRange(ds as IDateRangeInput)}
        icon={CalendarMinimalistic}
        content={<DateRangeSelector />}
        render={value => (
          <span>{value ? `${value.startTime} - ${value.endTime}` : ''}</span>
        )}
      />
    )
  },
}

export const Location: Story = {
  args: {
    label: '위치 선택',
    onChange: value => console.log('Input changed:', value),
    icon: Map,
    content: <MapLocationSelector />,
    render: () => <></>,
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
        render={value => <span>{value?.address}</span>}
      />
    )
  },
}

export const Array: Story = {
  args: {
    label: '배열 선택',
    onChange: value => console.log('Input changed:', value),
    icon: MedalRibbonStar,
    render: () => <></>,
    content: (
      <ArraySelector
        searchBarIcon={MedalRibbonStar}
        items={Object.entries(BADGES).map(([id, badge]) => ({
          id: Number(id),
          label: badge.name,
        }))}
        renderItem={badge => <Badge id={Number(badge.id)} />}
      />
    ),
  },
  render: () => {
    const [selectedItems, setSelectedItems] = useState<Achievement[]>()
    return (
      <InputPopup
        label='배열 선택'
        value={selectedItems}
        onChange={setSelectedItems}
        icon={MedalRibbonStar}
        render={value =>
          value?.map(badge => <span key={badge.id}>{badge.name}</span>)
        }
        content={
          <ArraySelector<Achievement>
            searchBarIcon={MedalRibbonStar}
            items={Object.entries(BADGES).map(([id, badge]) => ({
              id: Number(id),
              ...badge,
              label: badge.name,
            }))}
            renderItem={(badge: Achievement) => <Badge id={Number(badge.id)} />}
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
    render: () => <></>,
    content: (
      <ArraySelector
        searchBarIcon={UserRounded}
        multiple
        items={MEMBERS.map(member => ({
          ...member,
          label: member.nickname,
        }))}
        renderItem={member => <Profile {...member} />}
      />
    ),
  },
  render: () => {
    const [selectedItems, setSelectedItems] = useState<IMember[]>()
    return (
      <InputPopup
        label='다중 배열 선택'
        value={selectedItems}
        onChange={setSelectedItems}
        icon={UsersGroupTwoRounded}
        render={value =>
          value?.map(item => <span key={item.id}>{item.nickname}</span>)
        }
        content={
          <ArraySelector<IMember>
            searchBarIcon={UserRounded}
            multiple
            items={MEMBERS.map(member => ({
              ...member,
              label: member.nickname,
            }))}
            renderItem={member => <Profile {...member} />}
          />
        }
      />
    )
  },
}
