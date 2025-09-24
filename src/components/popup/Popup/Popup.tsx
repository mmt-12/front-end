import { type ReactNode } from 'react'
import { css } from '@emotion/react'
import { ArrowLeft } from '@solar-icons/react'

import HeaderItem from '@/components/layout/Header/HeaderItem'
import { slideUp } from '@/styles/animation'
import { withSafeAreaTop } from '@/styles/common'
import { headerStyle } from '@/styles/layout'
import { modalStyle } from '@/styles/modal'

interface Props {
  title: string
  children: ReactNode
  onClose: () => void
}

export default function Popup({ title, children, onClose }: Props) {
  return (
    <div
      css={[
        modalStyle,
        {
          animation: `${slideUp} 220ms cubic-bezier(0.22, 1, 0.36, 1)`,
          willChange: 'transform, opacity',
        },
      ]}
      onClick={e => e.stopPropagation()}
      onScroll={e => e.stopPropagation()}
    >
      <div css={headerStyle}>
        <HeaderItem onClick={onClose} icon={ArrowLeft} />
        <div>
          <span css={{ fontSize: '16px', fontWeight: 'bold' }}>{title}</span>
        </div>

        <HeaderItem onClick={() => {}} icon={null} />
      </div>
      <div css={contentStyle}>{children}</div>
    </div>
  )
}

const contentStyle = css({
  height: `calc(100vh - ${withSafeAreaTop(56)})`,
  marginTop: withSafeAreaTop(56),
  overflowY: 'scroll',
})
