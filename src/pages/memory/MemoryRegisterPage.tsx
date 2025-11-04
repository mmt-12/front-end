import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAssociateList, useCreateMemory } from '@/api'
import MemoryRegisterView from '@/components/memory/MemoryRegisterView'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import type { IDateRangeInput, ILocationInput, IMember } from '@/types'

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
  const [participants, setParticipants] = useState<IMember[]>()

  const handleSubmit = () => {
    if (!title || !dateRange || !location || !participants) {
      alert('제목과 날짜, 장소, 참여자는 필수 입력 사항입니다.')
      return
    }

    createMemory(
      {
        title,
        description,
        period: {
          startTime: new Date(
            dateRange.startTime.getTime() + 1000 * 60 * 60 * 9,
          ),
          endTime: new Date(dateRange.endTime.getTime() + 1000 * 60 * 60 * 9),
        },
        location: {
          latitude: location.location.latitude,
          longitude: location.location.longitude,
          address: location.address,
          name: '',
          code: -1,
        },
        associates: participants?.map(p => p.id) || [],
      },
      {
        onSuccess: async () => {
          await alert('기억이 생성되었습니다.')
          navigate(ROUTES.MEMORY_LIST)
        },
        onError: (error: Error) => {
          console.log(error)
          alert('기억 생성에 실패했습니다. 다시 시도해주세요.')
        },
      },
    )
  }

  return (
    <MemoryRegisterView
      action='REGISTER'
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      dateRange={dateRange}
      setDateRange={setDateRange}
      location={location}
      setLocation={setLocation}
      participants={participants}
      setParticipants={setParticipants}
      associates={associates}
      handleSubmit={handleSubmit}
    />
  )
}
