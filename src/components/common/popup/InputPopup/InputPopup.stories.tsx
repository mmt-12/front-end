import type { Meta, StoryObj } from '@storybook/react-vite'
import InputPopup from './InputPopup'
import {
  CalendarMinimalistic,
  Map,
  MedalRibbonStar,
  UsersGroupTwoRounded,
} from '@solar-icons/react'
import DateRangeSelector from '../DateRangeSelector'
import MapLocationSelector from '../MapLocationSelector'
import ArraySelector from '../ArraySelector'
import Badge from '@/components/common/Badge'
import Profile from '@/components/common/Profile'
import { BADGES } from '@/consts/BADGES'
import { MEMBERS } from '@/mocks/data/MEMBERS'

const meta = {
  title: 'components/popup/InputPopup',
  component: InputPopup,
  tags: ['autodocs'],
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

export const Array: Story = {
  args: {
    label: '배열 선택',
    onChange: value => console.log('Input changed:', value),
    icon: MedalRibbonStar,
    content: (
      <ArraySelector
        renderPreview
        items={Object.entries(BADGES).map(([id, badge]) => ({
          id,
          label: badge.name,
          render: () => <Badge id={parseInt(id)} />,
        }))}
        onSelect={val => console.log('선택된 아이템:', val)}
      />
    ),
  },
}

export const MultipleArray: Story = {
  args: {
    label: '다중 배열 선택',
    onChange: value => console.log('Input changed:', value),
    icon: UsersGroupTwoRounded,
    content: (
      <ArraySelector
        multiple
        items={MEMBERS.map(member => ({
          id: member.id,
          label: member.name,
          render: () => (
            <Profile
              id={member.id}
              name={member.name}
              imageUrl={member.imageUrl}
              badgeId={member.badgeId}
              description={member.description}
            />
          ),
        }))}
      />
    ),
  },
}
