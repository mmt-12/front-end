import { css, useTheme, type Theme } from '@emotion/react'

import Img from '@/components/common/Img'
import type { IReaction } from '@/types/reaction'

export default function Emoji({
  id,
  url: imageUrl,
  size = 'md',
  isActive = false,
  involved = false,
  onClick,
}: IReaction) {
  const theme = useTheme()
  return (
    <div
      onClick={e => onClick?.(e, id)}
      css={containerStyle}
      className='button'
    >
      <div css={imageWrapperStyle(theme, size, involved)}>
        <Img src={imageUrl} alt='Emoji' customCss={imageStyle} />
      </div>
      <div css={activeBarStyle(theme, isActive)} />
    </div>
  )
}

const containerStyle = css({
  width: 'fit-content',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  gap: '6px',
  borderRadius: '16px',
})

const imageWrapperStyle = (
  theme: Theme,
  size: 'md' | 'lg',
  involved: boolean,
) =>
  css({
    width: size === 'md' ? '52px' : '120px',
    height: size === 'md' ? '52px' : '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '12px',
    overflow: 'hidden',

    border: `${involved ? '3px' : '0px'} solid ${theme.colors.sky[300]}`,
    transition: 'outline 0.2s ease-in-out',
    filter: involved ? 'sepia(10%);' : 'none',
  })

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

const activeBarStyle = (theme: Theme, isActive: boolean) =>
  css({
    width: isActive ? 24 : 0,
    height: isActive ? 4 : 0,
    borderRadius: 2,
    backgroundColor: theme.colors.stone[300],
    transition: 'height 0.2s ease-in-out, width 0.2s ease-in-out',
  })
