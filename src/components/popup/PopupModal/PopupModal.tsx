import type { ReactNode } from 'react'
import { css, useTheme } from '@emotion/react'
import { ArrowLeft } from '@solar-icons/react'

import HeaderItem from '@/components/layout/Header/HeaderItem'
import WavyBox from '@/components/guest-book/WavyBox'
import { headerStyle } from '@/styles/layout'
import { modalStyle } from '@/styles/modal'

interface Props {
  title: string
  children: ReactNode
  onClose: () => void
}

export default function PopupModal({ title, children, onClose }: Props) {
  const theme = useTheme()
  return (
    <WavyBox
      strokeColor={theme.stone[600]}
      strokeWidth={2}
      backgroundColor={theme.bg}
      customCss={modalStyle}
    >
      <div
        css={css({ flex: 1, display: 'flex', flexDirection: 'column' })}
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
    </WavyBox>
  )
}

const contentStyle = css({
  overflowY: 'auto',
  height: 'calc(100vh - 60px)', // Adjust height to account for header
})
