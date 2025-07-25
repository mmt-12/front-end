import { useMemo, useState } from 'react'
import Button from '@/components/common/Button'
import type { IDateRangeInput } from '@/types'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { AltArrowLeft, AltArrowRight } from '@solar-icons/react'
import DayCell from './DayCell'
import { fixedWithMargin } from '@/styles/fixed'

interface Props {
  onSelect: (_range: IDateRangeInput) => void
}

export default function DateRangeSelector({ onSelect }: Props) {
  const theme = useTheme()

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate()

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedStart, setSelectedStart] = useState<Date | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null)

  const startDateString = useMemo(() => {
    if (selectedStart) {
      return `${selectedStart.getFullYear()}.${(
        selectedStart.getMonth() + 1
      ).toString()}.${selectedStart.getDate().toString()}`
    }
    return ''
  }, [selectedStart])

  const endDateString = useMemo(() => {
    if (selectedEnd) {
      return `${selectedEnd.getFullYear()}.${(
        selectedEnd.getMonth() + 1
      ).toString()}.${selectedEnd.getDate().toString()}`
    }
    return ''
  }, [selectedEnd])

  // Handle date click
  const handleDateClick = (date: Date) => {
    const isSameDate = startDateString === endDateString
    if (!selectedStart || (selectedStart && selectedEnd && !isSameDate)) {
      setSelectedStart(date)
      setSelectedEnd(null)
    } else if ((selectedStart && !selectedEnd) || isSameDate) {
      if (date >= selectedStart) {
        setSelectedEnd(date)
      } else {
        setSelectedStart(date)
        setSelectedEnd(null)
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
    if (!selectedStart) return 0
    if (date.getTime() === selectedStart.getTime()) return 2
    if (!selectedEnd) return 0
    if (date.getTime() === selectedEnd.getTime()) return 3

    if (date > selectedStart && date < selectedEnd) return 1
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
            {viewYear + 1}년 {viewMonth + 1}월
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
                          selectedStart={startDateString}
                          selectedEnd={endDateString}
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

      <div css={[fixedWithMargin(16), { bottom: '20px' }]}>
        {selectedStart ? (
          <Button
            type='secondary'
            onClick={() => {
              onSelect({
                startDate: startDateString,
                endDate: endDateString ? endDateString : startDateString,
                render: () => (
                  <span>
                    {endDateString
                      ? startDateString == endDateString
                        ? `${startDateString}`
                        : `${startDateString} - ${endDateString}`
                      : `${startDateString}`}
                  </span>
                ),
              })
            }}
            label={
              endDateString
                ? startDateString == endDateString
                  ? `${startDateString}으로 설정`
                  : `${startDateString} - ${endDateString}으로 설정`
                : `${startDateString}으로 설정`
            }
          ></Button>
        ) : (
          <Button label='날짜를 선택하세요.' type='disabled' />
        )}
      </div>
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
