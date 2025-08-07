import type { IReaction } from '@/types/reaction'
import { css, useTheme, type Theme } from '@emotion/react'

export default function Emoji({
  url: imageUrl,
  size = 'md',
  amount,
  isActive,
}: IReaction) {
  const theme = useTheme()
  return (
    <div css={containerStyle(theme, isActive)}>
      <div css={imageWrapperStyle(isActive, size)}>
        <img src={imageUrl} alt='Emoji' css={imageStyle} />
      </div>
      {amount != null && <p>{amount}</p>}
    </div>
  )
}

const containerStyle = (theme: Theme, isActive: boolean | undefined) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    gap: '4px',
    outline: isActive ? `3px solid ${theme.sky[300]}` : 'none',
    borderRadius: '12px',

    p: {
      marginRight: '6px',
      fontWeight: 300,
    },
  })

const imageWrapperStyle = (isActive: boolean | undefined, size: 'md' | 'lg') =>
  css({
    width: size === 'md' ? '44px' : '120px',
    height: size === 'md' ? '44px' : '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '12px',
    overflow: 'hidden',
  })

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})
