import { useState } from 'react'
import {
  CalendarMinimalistic,
  Map,
  UserRounded,
  UsersGroupTwoRounded,
} from '@solar-icons/react'

import { useAssociateList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import InputField from '@/components/common/InputField'
import Profile from '@/components/common/Profile'
import ArraySelector from '@/components/popup/ArraySelector'
import DateRangeSelector from '@/components/popup/DateRangeSelector'
import InputPopup from '@/components/popup/InputPopup'
import MapLocationSelector from '@/components/popup/MapLocationSelector'
import useHeader from '@/hooks/useHeader'
import type { IArrayInput, IDateRangeInput, ILocationInput } from '@/types'

export default function MemoryRegisterPage() {
  useHeader({
    routeName: '기억 생성',
    rightItem: {
      icon: null,
    },
  })

  const { data: memberData } = useAssociateList(1)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateRange, setDateRange] = useState<IDateRangeInput>()
  const [location, setLocation] = useState<ILocationInput>()
  const [participants, setParticipants] = useState<IArrayInput>()

  return (
    <>
      <InputField
        value={title}
        onChange={e => setTitle(e.target.value)}
        label='제목'
      />
      <InputPopup
        icon={CalendarMinimalistic}
        label='날짜'
        value={dateRange}
        onChange={ds => setDateRange(ds as IDateRangeInput)}
        content={<DateRangeSelector />}
      />
      <InputField
        value={description}
        onChange={e => setDescription(e.target.value)}
        label='설명'
        type='textarea'
      />
      <InputPopup
        value={location}
        label='장소'
        icon={Map}
        onChange={l => setLocation(l as ILocationInput)}
        content={<MapLocationSelector />}
      />
      {memberData && (
        <InputPopup
          label='참여자'
          value={participants}
          onChange={ps => setParticipants(ps as IArrayInput)}
          icon={UsersGroupTwoRounded}
          content={
            <ArraySelector
              initialItems={participants?.items || []}
              searchBarIcon={UserRounded}
              multiple
              items={memberData.associates.map(m => ({
                label: m.nickname,
                id: m.id,
                render: () => <Profile {...m} size='sm' introduction='' />,
              }))}
            />
          }
        />
      )}
      <BottomButton
        label='저장'
        type='primary'
        onClick={() => {
          console.log({
            title,
            description,
            dateRange,
            location,
            participants,
          })
        }}
      />
    </>
  )
}
