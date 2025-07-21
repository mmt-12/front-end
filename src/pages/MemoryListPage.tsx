import InputField from '@/components/common/InputField'
import useHeader from '@/hooks/useHeader'
import { Bell, SortByTime } from '@solar-icons/react'

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
          label='사용자 이름'
          type='string'
          onChange={val => console.log('string 입력:', val)}
        />

        <InputField
          label='지역 선택'
          type='popup'
          popupKind='map'
          onChange={val => console.log('선택된 지역:', val)}
        />

        <InputField
          label='날짜 선택'
          type='popup'
          popupKind='calendar'
          onChange={val => console.log('선택된 날짜:', val)}
        />
      </div>
    </div>
  )
}
