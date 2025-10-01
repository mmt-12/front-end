import { useState } from 'react'
import {
  CalendarMinimalistic,
  Map,
  UserRounded,
  UsersGroupTwoRounded,
} from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import { useAssociateList, useCreateMemory } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import InputField from '@/components/common/InputField'
import Profile from '@/components/member/Profile'
import ArraySelector from '@/components/popup/ArraySelector'
import DateRangeSelector from '@/components/popup/DateRangeSelector'
import InputPopup from '@/components/popup/InputPopup'
import MapLocationSelector from '@/components/popup/MapLocationSelector'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import type { IArrayInput, IDateRangeInput, ILocationInput } from '@/types'

export default function MemoryRegisterPage() {
  useHeader({
    routeName: '기억 생성',
    rightItem: {
      icon: null,
    },
  })

  const { alert } = useModal()
  const navigate = useNavigate()
  const { communityId } = useUserStore()
  const { mutate: createMemory } = useCreateMemory(communityId)
  const { data: memberData } = useAssociateList(communityId)
  const associates = memberData?.pages.flatMap(page => page.associates) || []

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateRange, setDateRange] = useState<IDateRangeInput>()
  const [location, setLocation] = useState<ILocationInput>()
  const [participants, setParticipants] = useState<IArrayInput>()

  const handleSubmit = () => {
    if (!title || !dateRange || !location) {
      alert('제목과 날짜, 장소는 필수 입력 사항입니다.')
      return
    }
    createMemory(
      {
        title,
        description,
        period: {
          startTime: new Date(dateRange.startTime),
          endTime: new Date(dateRange.endTime),
        },
        location: {
          latitude: location.location.latitude,
          longitude: location.location.longitude,
          address: location.address,
          name: '',
          code: -1,
        },
        associates: participants?.items.map(p => p.id) || [],
      },
      {
        onSuccess: async () => {
          await alert('기억이 생성되었습니다.')
          navigate(ROUTES.MEMORY_LIST)
        },
      },
    )
  }

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
      {associates.length > 0 && (
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
              items={associates.map(m => ({
                label: m.nickname,
                id: m.id,
                render: () => <Profile {...m} size='sm' introduction='' />,
              }))}
            />
          }
        />
      )}
      <BottomButton label='저장' type='primary' onClick={handleSubmit} />
    </>
  )
}
