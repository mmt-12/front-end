import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { AltArrowLeft, AltArrowRight } from '@solar-icons/react'

import type { DayCellType } from '@/types'
import DayCell from './DayCell'

interface Props {
  viewYear: number
  viewMonth: number
  setViewYear: (_year: number) => void
  setViewMonth: (_month: number) => void
  onClick: (_date: Date) => void
  getDayCellType: (_date: Date) => DayCellType
  getIsSelected: (_date: Date) => boolean
}

export default function CalendarPicker({
  viewYear,
  viewMonth,
  setViewYear,
  setViewMonth,
  onClick,
  getDayCellType,
  getIsSelected,
}: Props) {
  const theme = useTheme()

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate()

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const calendarDays: (Date | null)[] = []

  // 빈 날짜 채우기
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null)
  }
  // 실제 날짜 채우기
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(new Date(viewYear, viewMonth, d))
  }

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
    <div css={calendarWrapperStyle}>
      <div css={headerStyle}>
        <span css={headerTitleStyle}>
          {viewYear}년 {viewMonth + 1}월
        </span>
        <div css={navigationStyle}>
          <button onClick={() => handleMonthChange(-1)}>
            <AltArrowLeft
              weight='Linear'
              size={24}
              color={theme.colors.stone[400]}
            />
          </button>
          <button onClick={() => handleMonthChange(1)}>
            <AltArrowRight
              weight='Linear'
              size={24}
              color={theme.colors.stone[400]}
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
                      ? theme.colors.red
                      : day === '토'
                        ? theme.colors.blue
                        : theme.colors.stone[500],
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
                        type={getDayCellType(date)}
                        date={date}
                        onClick={onClick}
                        colIdx={colIdx}
                        isSelected={getIsSelected(date)}
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
  )
}
const calendarWrapperStyle = css({
  width: '100%',
  padding: '4px',
  margin: '0 auto',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
})


const headerStyle = (theme: Theme) =>
  css({
    width: '92%',
    padding: '12px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: `1px solid ${theme.colors.stone[300]}`,
    letterSpacing: '0.04em',
  })

const headerTitleStyle = (theme: Theme) =>
  css({
    fontSize: 18,
    fontWeight: 600,
    color: theme.colors.stone[900],
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
    color: theme.colors.stone[500],
  })
