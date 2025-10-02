import { useState } from 'react'
import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import CalendarPicker from '@/components/common/CalendarPicker/CalendarPicker'
import { useModal } from '@/hooks/useModal'
import { formatDate, formatDateRange } from '@/utils/date'

export default function DateRangeSelector() {
  const today = new Date()

  const { closeModal } = useModal()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [startTime, setStartDate] = useState<Date>()
  const [endTime, setEndDate] = useState<Date>()

  console.log({ startTime, endTime })

  const startDateString = startTime ? formatDate(startTime) : ''
  const endDateString = endTime ? formatDate(endTime) : ''

  const getDayCellType = (date: Date) => {
    if (startTime && endTime) {
      if (date > startTime && date < endTime) return 'inRange'
    }
    return 'default'
  }

  const handleDateClick = (date: Date) => {
    const isSameDate = startTime?.getTime() === endTime?.getTime()
    if (!startTime || (startTime && endTime && !isSameDate)) {
      setStartDate(date)
      setEndDate(undefined)
    } else if ((startTime && !endTime) || isSameDate) {
      if (date >= startTime) {
        setEndDate(date)
      } else {
        setStartDate(date)
        setEndDate(undefined)
      }
    }
  }

  return (
    <div css={containerStyle}>
      <CalendarPicker
        viewMonth={viewMonth}
        viewYear={viewYear}
        setViewMonth={setViewMonth}
        setViewYear={setViewYear}
        getDayCellType={getDayCellType}
        onClick={handleDateClick}
        getIsSelected={date =>
          date.getTime() === startTime?.getTime() ||
          date.getTime() === endTime?.getTime()
        }
      />

      {startTime ? (
        <BottomButton
          type='secondary'
          onClick={() => {
            closeModal({
              startTime: startDateString,
              endTime: endDateString ? endDateString : startDateString,
              render: () => <span>{formatDateRange(startTime, endTime)}</span>,
            })
          }}
          label={`${formatDateRange(startTime, endTime)} 으로 설정`}
        ></BottomButton>
      ) : (
        <BottomButton label='날짜를 선택하세요.' type='disabled' />
      )}
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    position: 'relative',
    padding: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    paddingBottom: '64px',
  })
