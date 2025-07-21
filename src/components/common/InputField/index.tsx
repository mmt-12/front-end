import { useState } from 'react'
import PopupModal from '../PopupModal'
import styled from '@emotion/styled'

type InputType = 'string' | 'popup'
type PopupKind = 'map' | 'calendar'

interface Props {
  label: string
  type: InputType
  popupKind?: PopupKind
  onChange: (_value: string | { startDate: string; endDate: string }) => void
}

const Container = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
`

const TextInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`

const PopupBox = styled.div`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f2f2f2;
  cursor: pointer;
`

export default function InputField({
  label,
  type,
  popupKind,
  onChange,
}: Props) {
  const [value, setValue] = useState<string>('')
  const [range, setRange] = useState<{
    startDate: string
    endDate: string
  } | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const handlePopupSelect = (result: any) => {
    setShowPopup(false)
    if (popupKind === 'calendar') {
      setRange(result)
      onChange(result)
    } else {
      setValue(result)
      onChange(result)
    }
  }

  return (
    <Container>
      <Label>{label}</Label>

      {type === 'string' && (
        <TextInput
          type='text'
          value={value}
          onChange={e => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
        />
      )}

      {type === 'popup' && (
        <>
          <PopupBox onClick={() => setShowPopup(true)}>
            {popupKind === 'calendar' && range
              ? `${range.startDate} ~ ${range.endDate}`
              : value || '클릭하여 선택'}
          </PopupBox>
          {showPopup && popupKind && (
            <PopupModal
              type={popupKind}
              onSelect={handlePopupSelect}
              onClose={() => setShowPopup(false)}
            />
          )}
        </>
      )}
    </Container>
  )
}
