/** @jsxImportSource @emotion/react */
import ReactDOM from 'react-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import MapPopupContent from '../popup/MapPopupContent'
import CalendarPopupContent from '../popup/CalendarPopupContent'

interface PopupModalProps {
  type: 'map' | 'calendar'
  onSelect: (_value: any) => void
  onClose: () => void
}

const overlayStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
})

const modalStyle = css({
  background: '#fff',
  padding: '16px',
  borderRadius: '8px',
  maxWidth: '90%',
  width: '360px',
  maxHeight: '80%',
  overflowY: 'auto',
})

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`

export default function PopupModal({
  type,
  onSelect,
  onClose,
}: PopupModalProps) {
  const modal = (
    <div css={overlayStyle} onClick={onClose}>
      <div css={modalStyle} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        {type === 'map' && <MapPopupContent onSelect={onSelect} />}
        {type === 'calendar' && <CalendarPopupContent onSelect={onSelect} />}
      </div>
    </div>
  )

  return ReactDOM.createPortal(modal, document.body)
}
