import InputField from '@/components/common/InputField'
import InputPopup from '@/components/common/InputPopup'
import DateRangeSelector from '@/components/popup/DateRangeSelector'
import MapLocationSelector from '@/components/popup/MapLocationSelector'
import MemberSelector from '@/components/popup/MemberSelector/MemberSelector'
import useHeader from '@/hooks/useHeader'
import type { IDateRangeInput } from '@/types'
import { useTheme } from '@emotion/react'
import {
  Bell,
  CalendarMinimalistic,
  Map,
  SortByTime,
  UsersGroupTwoRounded,
} from '@solar-icons/react'

export default function MemoryListPage() {
  useHeader({
    routeName: '기억',
    leftItem: {
      icon: <SortByTime weight='Bold' size={32} />,
      onClick: () => console.log('list clicked'),
    },
    rightItem: {
      icon: <Bell weight='Bold' size={32} />,
      onClick: () => console.log('Bell clicked'),
    },
  })
  const theme = useTheme()

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
          icon={<Map weight='Bold' size={24} color={theme.stone[400]} />}
        />

        <InputPopup
          label='날짜'
          onChange={(val: IDateRangeInput) => console.log('선택된 날짜:', val)}
          content={
            <DateRangeSelector
              onSelect={val => console.log('선택된 날짜:', val)}
            />
          }
          icon={
            <CalendarMinimalistic
              weight='Bold'
              size={24}
              color={theme.stone[400]}
            />
          }
        />

        <InputPopup
          label='멤버'
          onChange={(val: string[]) => console.log('선택된 멤버:', val)}
          content={
            <MemberSelector
              onSelect={val => console.log('선택된 멤버:', val)}
            />
          }
          icon={
            <UsersGroupTwoRounded
              weight='Bold'
              size={24}
              color={theme.stone[400]}
            />
          }
        />
      </div>
    </div>
  )
}
