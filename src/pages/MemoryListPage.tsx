import InputField from '@/components/common/InputField'
import InputPopup from '@/components/common/popup/InputPopup'
import DateRangeSelector from '@/components/common/popup/DateRangeSelector'
import MapLocationSelector from '@/components/common/popup/MapLocationSelector'
import ArraySelector from '@/components/common/popup/ArraySelector'
import useHeader from '@/hooks/useHeader'
import type { IArrayInput, IDateRangeInput, ILocationInput } from '@/types'
import {
  Bell,
  CalendarMinimalistic,
  Map,
  MedalRibbonStar,
  SortByTime,
} from '@solar-icons/react'
import Badge from '@/components/common/Badge'
import { BADGES } from '@/consts/BADGES'
import Profile from '@/components/common/Profile'
import { MEMBERS } from '@/mocks/data/MEMBERS'

export default function MemoryListPage() {
  useHeader({
    routeName: '기억',
    leftItem: {
      icon: SortByTime,
      onClick: () => console.log('list clicked'),
    },
    rightItem: {
      icon: Bell,
      onClick: () => console.log('Bell clicked'),
    },
  })

  return (
    <div>
      memory list page
      <div>
        <InputField
          label='이름'
          onChange={(val: string) => {
            console.log('string 입력:', val)
          }}
        />
        <InputField
          label='컨텐츠'
          onChange={(val: string) => {
            console.log('string 입력:', val)
          }}
          size='lg'
        />

        <InputPopup
          label='장소'
          onChange={(val: ILocationInput) => console.log('선택된 지역:', val)}
          content={
            <MapLocationSelector
              onSelect={val => console.log('선택된 지역:', val)}
            />
          }
          icon={Map}
        />

        <InputPopup
          label='달력'
          onChange={(val: IDateRangeInput) => console.log('선택된 날짜:', val)}
          content={
            <DateRangeSelector
              onSelect={val => console.log('선택된 날짜:', val)}
            />
          }
          icon={CalendarMinimalistic}
        />

        <InputPopup
          label='칭호'
          onChange={(val: IArrayInput) => console.log('선택된 칭호:', val)}
          content={
            <ArraySelector
              renderPreview
              items={Object.entries(BADGES).map(([id, badge]) => ({
                id,
                label: badge.name,
                render: () => <Badge id={parseInt(id)} />,
              }))}
            />
          }
          icon={MedalRibbonStar}
        />
        <InputPopup
          label='멤버'
          onChange={(val: IArrayInput) => console.log('선택된 멤버:', val)}
          content={
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
          }
          icon={MedalRibbonStar}
        />
      </div>
    </div>
  )
}
