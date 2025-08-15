import { useState } from 'react'
import type { IDateRangeInput } from '@/types'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { AltArrowLeft, AltArrowRight } from '@solar-icons/react'
import DayCell from './DayCell'
import BottomButton from '@/components/common/BottomButton'
import { formatDate, formatDateRange } from '@/utils/date'

interface Props {
  onSelect?: (_range: IDateRangeInput) => void
}

export default function DateRangeSelector({ onSelect }: Props) {
  const theme = useTheme()

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate()

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const startDateString = startDate ? formatDate(startDate) : ''

  const endDateString = endDate ? formatDate(endDate) : ''

  // Handle date click
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

  // Render calendar days
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const calendarDays: (Date | null)[] = []

  // Fill empty slots before first day
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null)
  }
  // Fill actual days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(new Date(viewYear, viewMonth, d))
  }

  const getSelectedState = (date: Date) => {
    if (!startDate) return 0
    if (date.getTime() === startDate.getTime()) return 2
    if (!endDate) return 0
    if (date.getTime() === endDate.getTime()) return 3

    if (date > startDate && date < endDate) return 1
    return 0
  }

  // Handle month/year change
  const handleMonthChange = (delta: number) => {
    let newMonth = viewMonth + delta
    let newYear = viewYear
    if (newMonth < 0) {
      newMonth = 11
      newYear -= 1
    } else if (newMonth > 11) {
      newMonth = 0
      newYear += 1
    }
    setViewMonth(newMonth)
    setViewYear(newYear)
  }

  return (
    <div css={containerStyle}>
      <div css={calendarWrapperStyle}>
        <div css={headerStyle}>
          <span css={headerTitleStyle}>
            {viewYear}년 {viewMonth + 1}월
          </span>
          <div css={navigationStyle}>
            <button onClick={() => handleMonthChange(-1)}>
              <AltArrowLeft
                weight='Linear'
                size={28}
                color={theme.stone[400]}
              />
            </button>
            <button onClick={() => handleMonthChange(1)}>
              <AltArrowRight
                weight='Linear'
                size={28}
                color={theme.stone[400]}
              />
            </button>
          </div>
        </div>
        <table css={tableStyle}>
          <thead>
            <tr>
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <th
                  key={day}
                  css={tableHeaderStyle}
                  style={{
                    color:
                      day === '일'
                        ? theme.red
                        : day === '토'
                        ? theme.blue
                        : theme.stone[500],
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
              (_, rowIdx) => (
                <tr key={rowIdx}>
                  {calendarDays
                    .slice(rowIdx * 7, rowIdx * 7 + 7)
                    .map((date, colIdx) =>
                      date ? (
                        <DayCell
                          key={colIdx + rowIdx * 10}
                          date={date}
                          state={getSelectedState(date)}
                          onClick={() => handleDateClick(date)}
                          startDate={startDateString}
                          endDate={endDateString}
                          colIdx={colIdx}
                        />
                      ) : (
                        <td key={colIdx + rowIdx * 10}></td>
                      ),
                    )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

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

const calendarWrapperStyle = css({
  display: 'flex',
  padding: '4px',
  margin: '0 auto',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
})

const headerStyle = (theme: Theme) =>
  css({
    width: '92%',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.stone[300]}`,
    letterSpacing: '0.04em',
  })

const headerTitleStyle = css({
  fontSize: 20,
  fontWeight: 'bold',
})

const navigationStyle = css({
  display: 'flex',
  gap: 16,
})

const tableStyle = css({
  borderCollapse: 'collapse',
  width: '100%',
})

const tableHeaderStyle = (theme: Theme) =>
  css({
    padding: '8px 2px',
    fontWeight: '500',
    textAlign: 'center',
    color: theme.stone[500],
  })
