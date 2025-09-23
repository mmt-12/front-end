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
        <div css={shadowStyle(size, involved)}></div>
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
})

const imageWrapperStyle = (
  theme: Theme,
  size: 'sm' | 'md' | 'lg',
  involved: boolean,
) =>
  css({
    position: 'relative',
    width: size === 'sm' ? '52px' : size === 'md' ? '64px' : '120px',
    height: size === 'sm' ? '52px' : size === 'md' ? '64px' : '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: size === 'sm' ? 10 : size === 'md' ? 14 : 20,
    overflow: 'hidden',

    border: `${involved ? (size === 'sm' ? '3px' : size === 'md' ? '4px' : '6px') : '0px'} solid ${theme.colors.sky[400]}`,
    transition: 'border 180ms ease-out',
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
    marginTop: isActive ? 4 : 0,

    borderRadius: 2,
    backgroundColor: theme.colors.stone[300],
    transition:
      'margin 180ms ease-out, height 180ms ease-out, width 180ms ease-out',
  })

const shadowStyle = (size: 'sm' | 'md' | 'lg', involved: boolean) =>
  css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,

    borderRadius: size === 'sm' ? 6 : size === 'md' ? 9 : 16,
    boxShadow: involved ? 'inset 0px 0px 8px 2px rgba(0, 0, 0, 0.25)' : 'none',
    pointerEvents: 'none',
    transition: 'box-shadow 180ms ease-out',
  })
