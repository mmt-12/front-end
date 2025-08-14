import BottomButton from '@/components/common/BottomButton'
import InputField from '@/components/common/InputField'
import ArraySelector from '@/components/common/popup/ArraySelector'
import DateRangeSelector from '@/components/common/popup/DateRangeSelector'
import InputPopup from '@/components/common/popup/InputPopup'
import MapLocationSelector from '@/components/common/popup/MapLocationSelector'
import Profile from '@/components/common/Profile'
import useHeader from '@/hooks/useHeader'
import { MEMBERS } from '@/mocks/data/members'
import type { IArrayInput, IDateRangeInput, ILocationInput } from '@/types'
import {
  CalendarMinimalistic,
  Map,
  UsersGroupTwoRounded,
} from '@solar-icons/react'
import { useState } from 'react'

export default function MemoryRegisterPage() {
  useHeader({
    routeName: '기억 생성',
    rightItem: {
      icon: null,
    },
  })

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateRange, setDateRange] = useState<IDateRangeInput>()
  const [location, setLocation] = useState<ILocationInput>()
  const [participants, setParticipants] = useState<IArrayInput>()

  return (
    <div>
      <InputField onChange={setTitle} label='제목' />
      <InputPopup
        content={<DateRangeSelector />}
        icon={CalendarMinimalistic}
        label='날짜'
        onChange={ds => setDateRange(ds as IDateRangeInput)}
      />
      <InputField
        onChange={d => {
          setDescription(d as string)
        }}
        label='설명'
        size='lg'
      />
      <InputPopup
        content={<MapLocationSelector />}
        label='장소'
        icon={Map}
        onChange={l => setLocation(l as ILocationInput)}
      />
      <InputPopup
        content={
          <ArraySelector
            multiple
            items={MEMBERS.map(m => ({
              label: m.name,
              id: m.id,
              render: () => <Profile {...m} size='sm' description='' />,
            }))}
          />
        }
        label='참여자'
        onChange={ps => setParticipants(ps as IArrayInput)}
        icon={UsersGroupTwoRounded}
      />
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
    </div>
  )
}
