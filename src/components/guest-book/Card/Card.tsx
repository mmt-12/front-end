import WavyBox from '@/components/common/WavyBox'
import { css, useTheme } from '@emotion/react'

interface Props {
  title: string
  children: React.ReactNode
}

export default function Card({ title, children }: Props) {
  const theme = useTheme()

  return (
    <WavyBox
      strokeColor={theme.stone[600]}
      strokeWidth={2.5}
      backgroundColor='white'
      borderRadius={16}
      customCss={containerStyle}
    >
      <div css={contentStyle}>
        <p css={cardTitleStyle}>{`#${title}`}</p>
        {children}
      </div>
    </WavyBox>
  )
}

const containerStyle = css({
  width: '100%',
})

const contentStyle = css({
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '18px 16px',
})

const cardTitleStyle = css({
  fontFamily: 'PressStart2P',
  fontSize: '14px',
  margin: '4px 0 24px',
})
