import InputField from '@/components/common/InputField'
import InputPopup from '@/components/common/InputPopup'
import CalendarPopupContent from '@/components/popup/CalendarPopupContent'
import MapPopupContent from '@/components/popup/MapPopupContent'
import useHeader from '@/hooks/useHeader'
import type { IDateRangeInput } from '@/types'
import { Bell, CalendarMinimalistic, Map, SortByTime } from '@solar-icons/react'

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
          label='지역 선택'
          onChange={(val: string) => console.log('선택된 지역:', val)}
          content={
            <MapPopupContent
              onSelect={val => console.log('선택된 지역:', val)}
            />
          }
          icon={<Map weight='Bold' size={24} />}
        />

        <InputPopup
          label='날짜 선택'
          onChange={(val: IDateRangeInput) => console.log('선택된 날짜:', val)}
          content={
            <CalendarPopupContent
              onSelect={val => console.log('선택된 날짜:', val)}
            />
          }
          icon={<CalendarMinimalistic weight='Bold' size={24} />}
        />
      </div>
    </div>
  )
}
