import { css, useTheme, type Interpolation, type Theme } from '@emotion/react'
import { Widget } from '@solar-icons/react'

import WavyBox from '@/components/guest-book/WavyBox'

interface Props {
  title: string
  onClick?: () => void
  onButtonClick?: () => void
  children: React.ReactNode
  customCss?: Interpolation<Theme>
}

export default function Card({
  title,
  onClick,
  onButtonClick,
  children,
  customCss,
}: Props) {
  const theme = useTheme()

  return (
    <WavyBox
      strokeColor={theme.colors.stone[600]}
      strokeWidth={2.2}
      backgroundColor='white'
      borderRadius={16}
      customCss={[containerStyle, customCss]}
    >
      <div
        css={contentStyle}
        onClick={onClick}
        className={onClick && 'button lg'}
      >
        <div css={headerStyle}>
          {onButtonClick && <div css={sideAreaStyle} />}
          <p css={cardTitleStyle}>{`#${title}`}</p>
          {onButtonClick && (
            <Widget
              className='button'
              size={24}
              color={theme.colors.stone[700]}
              weight='Bold'
              onClick={onButtonClick}
            />
          )}
        </div>
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

const headerStyle = css({
  width: '100%',
  padding: '4px 4px 18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const sideAreaStyle = css({
  width: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const cardTitleStyle = css({
  fontFamily: 'PressStart2P',
  fontSize: 14,
  textAlign: 'center',
  flex: 1,
})
