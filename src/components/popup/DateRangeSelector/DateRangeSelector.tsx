import { useState } from 'react'
import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import CalendarPicker from '@/components/common/CalendarPicker/CalendarPicker'
import type { IDateRangeInput } from '@/types'
import { formatDate, formatDateRange } from '@/utils/date'
import DayCell from './DayCell'

interface Props {
  onSelect?: (_range: IDateRangeInput) => void
}

export default function DateRangeSelector({ onSelect }: Props) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const startDateString = startDate ? formatDate(startDate) : ''
  const endDateString = endDate ? formatDate(endDate) : ''

  const getDayCellType = (date: Date) => {
    if (startDate && endDate) {
      if (date > startDate && date < endDate) return 'inRange'
    }
    return 'default'
  }

  const handleDateClick = (date: Date) => {
    const isSameDate = startDate?.getTime() === endDate?.getTime()
    if (!startDate || (startDate && endDate && !isSameDate)) {
      setStartDate(date)
      setEndDate(undefined)
    } else if ((startDate && !endDate) || isSameDate) {
      if (date >= startDate) {
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
          date.getTime() === startDate?.getTime() ||
          date.getTime() === endDate?.getTime()
        }
      />

      {startDate ? (
        <BottomButton
          type='secondary'
          onClick={() => {
            onSelect?.({
              startDate: startDateString,
              endDate: endDateString ? endDateString : startDateString,
              render: () => <span>{formatDateRange(startDate, endDate)}</span>,
            })
          }}
          label={`${formatDateRange(startDate, endDate)} 으로 설정`}
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
    backgroundColor: theme.white,
    borderRadius: 16,
    paddingBottom: '64px',
  })
