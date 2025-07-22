import { useMemo, useState } from 'react'
import Button from '@/components/common/Button'
import type { IDateRangeInput } from '@/types'

interface Props {
  onSelect: (_range: IDateRangeInput) => void
}

const titleStyle = {
  fontWeight: 'bold',
  marginBottom: '8px',
}

export default function CalendarPopupContent({ onSelect }: Props) {
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
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date)
      setSelectedEnd(null)
    } else if (selectedStart && !selectedEnd) {
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

  // Check if date is selected
  const isSelected = (date: Date) => {
    if (!selectedStart) return false
    if (selectedStart && !selectedEnd)
      return date.getTime() === selectedStart.getTime()
    if (selectedStart && selectedEnd)
      return (
        date.getTime() === selectedStart.getTime() ||
        date.getTime() === selectedEnd.getTime() ||
        (date > selectedStart && date < selectedEnd)
      )
    return false
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

  // Handle year search
  const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val)) setViewYear(val)
  }

  return (
    <div>
      <div style={titleStyle}>날짜 범위 선택</div>
      <div>
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <span>
          <input type='number' value={viewYear} onChange={handleYearInput} />
          {viewMonth + 1}월
        </span>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <th key={day} style={{ padding: 4, fontWeight: 'bold' }}>
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
                  .map((date, colIdx) => (
                    <td
                      key={colIdx}
                      style={{
                        padding: 4,
                        textAlign: 'center',
                        cursor: date ? 'pointer' : 'default',
                        background:
                          date && isSelected(date) ? '#28a745' : undefined,
                        color: date && isSelected(date) ? 'white' : undefined,
                        borderRadius: date && isSelected(date) ? 4 : undefined,
                      }}
                      onClick={() => date && handleDateClick(date)}
                    >
                      {date ? date.getDate() : ''}
                    </td>
                  ))}
              </tr>
            ),
          )}
        </tbody>
      </table>

      {selectedStart && selectedEnd ? (
        <Button
          type='secondary'
          onClick={() => {
            if (selectedStart && selectedEnd) {
              onSelect({
                startDate: startDateString,
                endDate: endDateString,
                toString: () => `${startDateString} - ${endDateString}`,
              })
            }
          }}
          label={`${selectedStart.getFullYear()}.${(
            selectedStart.getMonth() + 1
          ).toString()}.${selectedStart
            .getDate()
            .toString()} - ${selectedEnd.getFullYear()}.${(
            selectedEnd.getMonth() + 1
          ).toString()}.${selectedEnd.getDate().toString()}으로 설정`}
        ></Button>
      ) : (
        <Button label='날짜를 선택하세요.' type='disabled' />
      )}
    </div>
  )
}
