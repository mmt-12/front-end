import { css, type Theme } from '@emotion/react'
import { useEffect, useMemo, useState } from 'react'

export interface Props {
  label: string
  onChange: (_value: Date | null) => void
}

export default function DateInputField({ label, onChange }: Props) {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [day, setDay] = useState<number>(new Date().getDate())

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(e.target.value, 10)
    if (isNaN(newYear)) return setYear(0)
    if (newYear < 0 || newYear > 2002) return
    setYear(newYear)
  }
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = parseInt(e.target.value, 10) - 1
    if (isNaN(newMonth)) return setMonth(-1)
    if (newMonth < 0 || newMonth > 11) return
    setMonth(newMonth)
  }
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = parseInt(e.target.value, 10)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    if (isNaN(newDay)) return setDay(0)
    if (newDay < 1 || newDay > daysInMonth) return
    setDay(newDay)
  }

  const date = useMemo(() => {
    return new Date(year, month, day)
  }, [year, month, day])

  useEffect(() => {
    onChange(date)
  }, [date, onChange])

  return (
    <form onSubmit={e => e.preventDefault()} css={containerStyle}>
      <label css={labelStyle}>{label}</label>
      <div css={inputContainerStyle}>
        <div css={inputsWrapperStyle}>
          <input
            inputMode='numeric'
            onChange={handleYearChange}
            value={year}
            size={4}
            maxLength={4}
          />
          <p>년</p>
          <input
            inputMode='numeric'
            onChange={handleMonthChange}
            value={month + 1}
            size={2}
            maxLength={2}
          />
          <p>월</p>
          <input
            inputMode='numeric'
            onChange={handleDayChange}
            value={day}
            size={2}
            maxLength={2}
          />
          <p>일</p>
        </div>
      </div>
    </form>
  )
}

const containerStyle = css({
  margin: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

const labelStyle = (theme: Theme) =>
  css({
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    color: theme.stone[700],
    transition: 'color 0.1s ease-in-out',

    '&:has(+input:focus), &:has(+textarea:focus), &:has(+div>div>input:focus)':
      {
        color: theme.sky[500],
      },
  })

const inputsWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    color: theme.black,
    fontFamily: 'inherit',
    fontSize: '18px',
    letterSpacing: '0.5px',

    '>input': {
      border: 'none',
      outline: 'none',
      fontSize: '18px',
      textAlign: 'end',
    },
    '>p': {
      marginRight: '4px',
    },
  })

const inputContainerStyle = (theme: Theme) =>
  css({
    margin: '0px',
    padding: '14px 16px',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '32px',

    borderRadius: '12px',
    outline: `2px solid ${theme.stone[400]}`,
    transition: 'outline 0.1s ease-in-out',
    '&:focus': {
      outline: `2px solid ${theme.sky[400]}`,
    },

    '&:has(input:focus)': {
      outline: `2px solid ${theme.sky[400]}`,
    },
  })
