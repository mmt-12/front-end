import { useState } from 'react'
import styled from '@emotion/styled'

interface Props {
  onSelect: (_region: string) => void
}

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 8px;
`

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
`

const Button = styled.button`
  background-color: #0077cc;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #005fa3;
  }
`

export default function MapPopupContent({ onSelect }: Props) {
  const [region, setRegion] = useState('서울')

  return (
    <div>
      <Title>지역 선택</Title>
      <Select value={region} onChange={e => setRegion(e.target.value)}>
        <option value='서울'>서울</option>
        <option value='부산'>부산</option>
        <option value='제주'>제주</option>
      </Select>
      <Button onClick={() => onSelect(region)}>선택 완료</Button>
    </div>
  )
}
