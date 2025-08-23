import type { ReactNode } from 'react'
import { css } from '@emotion/react'
import { ArrowLeft } from '@solar-icons/react'
import ReactDOM from 'react-dom'

import HeaderItem from '@/components/layout/Header/HeaderItem'
import { headerStyle } from '@/styles/layout'
import { modalStyle } from '@/styles/modal'

interface Props {
  title: string
  children: ReactNode
  onClose: () => void
}

export default function PopupModal({ title, children, onClose }: Props) {
  const modal = (
    <div
      css={modalStyle}
      onClick={e => e.stopPropagation()}
      onScroll={e => e.stopPropagation()}
    >
      <header css={headerStyle}>
        <HeaderItem onClick={onClose} icon={ArrowLeft} />
        <div>
          <span css={{ fontSize: '16px', fontWeight: 'bold' }}>{title}</span>
        </div>

        <HeaderItem onClick={() => {}} icon={null} />
      </header>
      <div css={contentStyle}>{children}</div>
    </div>
  )

  return ReactDOM.createPortal(modal, document.body)
}

const contentStyle = css({
  overflowY: 'auto',
  height: 'calc(100vh - 60px)', // Adjust height to account for header
})
