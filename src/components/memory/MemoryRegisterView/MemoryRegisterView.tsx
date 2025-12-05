import {
  CalendarMinimalistic,
  Map,
  UserRounded,
  UsersGroupTwoRounded,
} from '@solar-icons/react'

import BottomButton from '@/components/common/BottomButton'
import InputField from '@/components/common/InputField'
import Profile from '@/components/member/Profile'
import ArraySelector from '@/components/popup/ArraySelector'
import DateRangeSelector from '@/components/popup/DateRangeSelector'
import InputPopup from '@/components/popup/InputPopup'
import MapLocationSelector from '@/components/popup/MapLocationSelector'
import type { IDateRangeInput, ILocationInput, IMember } from '@/types'
import { formatDate } from '@/utils/date'

interface Props {
  action: 'REGISTER' | 'EDIT'
  title: string
  setTitle: (_title: string) => void
  description: string
  setDescription: (_description: string) => void
  dateRange?: IDateRangeInput
  setDateRange: (_dateRange: IDateRangeInput) => void
  location?: ILocationInput
  setLocation: (_location: ILocationInput) => void
  participants?: IMember[]
  setParticipants: (_participants: IMember[]) => void
  associates: IMember[]
  handleSubmit: () => void
}

export default function MemoryRegisterView({
  action,
  title,
  setTitle,
  description,
  setDescription,
  dateRange,
  setDateRange,
  location,
  setLocation,
  participants,
  setParticipants,
  associates,
  handleSubmit,
}: Props) {
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
        onChange={ds => setDateRange(ds)}
        content={<DateRangeSelector />}
        render={value => (
          <span>
            {value &&
              `${formatDate(value.startTime)} -
                  ${formatDate(value.endTime)}`}
          </span>
        )}
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
        render={value => <span>{value?.address}</span>}
      />
      <InputPopup
        label='참여자'
        value={participants}
        onChange={ps => setParticipants(ps)}
        icon={UsersGroupTwoRounded}
        render={value => <span>{value?.map(p => p.nickname).join(', ')}</span>}
        content={
          <ArraySelector<IMember>
            items={associates.map(associate => ({
              ...associate,
              label: associate.nickname,
            }))}
            renderItem={item => <Profile {...item} size='sm' introduction='' />}
            initialItems={
              participants?.map(p => ({ ...p, label: p.nickname })) || []
            }
            searchBarIcon={UserRounded}
            multiple
          />
        }
      />
      <BottomButton
        label={action === 'EDIT' ? '수정' : '저장'}
        type='primary'
        onClick={handleSubmit}
      />
    </>
  )
}
