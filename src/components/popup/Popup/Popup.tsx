import { type ReactNode } from 'react'
import { css } from '@emotion/react'
import { ArrowLeft } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import HeaderItem from '@/components/layout/Header/HeaderItem'
import { withSafeAreaTop } from '@/styles/common'
import { headerStyle } from '@/styles/layout'
import { modalStyle } from '@/styles/modal'

interface Props {
  title: string
  children: ReactNode
}

export default function Popup({ title, children }: Props) {
  const navigate = useNavigate()
  return (
    <div
      css={modalStyle}
      onClick={e => e.stopPropagation()}
      onScroll={e => e.stopPropagation()}
    >
      <div css={headerStyle}>
        <HeaderItem
          onClick={() => {
            navigate(-1)
          }}
          icon={ArrowLeft}
        />
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
  height: `calc(100dvh - ${withSafeAreaTop(56)})`,
  marginTop: withSafeAreaTop(56),
  overflowY: 'scroll',
})
