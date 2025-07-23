import InputField from '@/components/common/InputField'
import InputPopup from '@/components/common/popup/InputPopup'
import DateRangeSelector from '@/components/common/popup/DateRangeSelector'
import MapLocationSelector from '@/components/common/popup/MapLocationSelector'
import ArraySelector from '@/components/common/popup/ArraySelector'
import useHeader from '@/hooks/useHeader'
<<<<<<< HEAD
import type { IDateRangeInput } from '@/types'
import {
  Bell,
  CalendarMinimalistic,
  Map,
  MedalRibbonStar,
  SortByTime,
  UsersGroupTwoRounded,
} from '@solar-icons/react'
=======
import { SortByTime } from '@solar-icons/react'
>>>>>>> 01815eacaf2e912a3f7c9edcafba6f54e3e24038

export default function MemoryListPage() {
  useHeader({
    routeName: '기억',
    leftItem: {
      icon: SortByTime,
      onClick: () => console.log('list clicked'),
    },
<<<<<<< HEAD
    rightItem: {
      icon: Bell,
      onClick: () => console.log('Bell clicked'),
    },
=======
>>>>>>> 01815eacaf2e912a3f7c9edcafba6f54e3e24038
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

        <InputPopup
          label='장소'
          onChange={(val: string) => console.log('선택된 지역:', val)}
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
          label='멤버'
          onChange={(val: string[]) => console.log('선택된 멤버:', val)}
          content={
            <ArraySelector
              items={[
                { id: '1', label: '멤버1' },
                { id: '2', label: '멤버2' },
              ]}
            />
          }
          icon={UsersGroupTwoRounded}
        />

        <InputPopup
          label='칭호'
          onChange={(val: string[]) => console.log('선택된 칭호:', val)}
          content={
            <ArraySelector
              items={[
                { id: '1', label: '칭호1' },
                { id: '2', label: '칭호2' },
                { id: '3', label: '칭호3' },
              ]}
            />
          }
          icon={MedalRibbonStar}
        />
      </div>
    </div>
  )
}
