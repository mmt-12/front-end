import { useState } from 'react'
import { css } from '@emotion/react'

interface Props {
  onSelect: (_region: string) => void
}

const titleStyle = css({
  fontWeight: 'bold',
  marginBottom: '8px',
})

const selectStyle = css({
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '12px',
})

const buttonStyle = css({
  backgroundColor: '#0077cc',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#005fa3',
  },
})

export default function MapLocationSelector({ onSelect }: Props) {
  const [region, setRegion] = useState('서울')

  return (
    <div>
      <h2 css={titleStyle}>지역 선택</h2>
      <select
        css={selectStyle}
        value={region}
        onChange={e => setRegion(e.target.value)}
      >
        <option value='서울'>서울</option>
        <option value='부산'>부산</option>
        <option value='제주'>제주</option>
      </select>
      <button css={buttonStyle} onClick={() => onSelect(region)}>
        선택 완료
      </button>
    </div>
  )
}
