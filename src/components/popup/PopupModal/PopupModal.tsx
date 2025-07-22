/** @jsxImportSource @emotion/react */
import ReactDOM from 'react-dom'
import { css } from '@emotion/react'
import { ArrowLeft } from '@solar-icons/react'
import type { Theme } from '@emotion/react'
import { headerStyle } from '@/styles/header'
import HeaderItem from '@/components/HeaderItem'
import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  onClose: () => void
}

const modalStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    maxWidth: theme.maxWidth,
    inset: 0,
    margin: 'auto',
    overflowY: 'auto',
    background: theme.bg,
    zIndex: 1000,
  })

export default function PopupModal({ title, children, onClose }: Props) {
  const modal = (
    <div css={modalStyle} onClick={e => e.stopPropagation()}>
      <header css={headerStyle}>
        <HeaderItem
          onClick={onClose}
          icon={<ArrowLeft weight='Bold' size={32} />}
        />
        <div>
          <span css={{ fontSize: '16px', fontWeight: 'bold' }}>{title}</span>
        </div>

        <HeaderItem onClick={() => {}} icon={<></>} />
      </header>
      {children}
    </div>
  )

  return ReactDOM.createPortal(modal, document.body)
}
