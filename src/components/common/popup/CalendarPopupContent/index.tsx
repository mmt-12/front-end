import { useState } from 'react'
import styled from '@emotion/styled'

interface CalendarPopupContentProps {
  onSelect: (_range: { startDate: string; endDate: string }) => void
}

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 8px;
`

const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
`

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #1e7e34;
  }
`

export default function CalendarPopupContent({
  onSelect,
}: CalendarPopupContentProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return (
    <div>
      <Title>날짜 범위 선택</Title>
      <div>
        <DateInput
          type='date'
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <DateInput
          type='date'
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
      <Button onClick={() => onSelect({ startDate, endDate })}>
        선택 완료
      </Button>
    </div>
  )
}
