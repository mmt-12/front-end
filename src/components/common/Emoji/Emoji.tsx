import type { IReaction } from '@/types/reaction'
import { css, useTheme, type Theme } from '@emotion/react'

export default function Emoji({
  id,
  url: imageUrl,
  size = 'md',
  amount,
  isActive = false,
  iReacted = false,
  onClick,
}: IReaction) {
  const theme = useTheme()
  return (
    <div
      onClick={e => onClick(e, id)}
      css={containerStyle(theme, iReacted, isActive, !!amount)}
    >
      <div css={imageWrapperStyle(size, !!amount)}>
        <img src={imageUrl} alt='Emoji' css={imageStyle} />
      </div>
      {amount != null && <p>{amount}</p>}
    </div>
  )
}

const containerStyle = (
  theme: Theme,
  iReacted: boolean,
  isActive: boolean,
  isAmount: boolean,
) =>
  css({
    width: 'fit-content',
    padding: isAmount ? '6px' : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    gap: '6px',
    outline: iReacted
      ? isAmount
        ? 'none'
        : `3px solid ${theme.sky[300]}`
      : 'none',
    borderRadius: '16px',
    backgroundColor: isActive ? theme.stone[200] : 'transparent',

    p: {
      marginRight: '6px',
      fontWeight: iReacted ? 'bold' : 'normal',
      color: iReacted ? theme.sky[500] : theme.black,
    },
  })

const imageWrapperStyle = (size: 'md' | 'lg', isAmount: boolean) =>
  css({
    width: size === 'md' ? (isAmount ? '40px' : '48px') : '120px',
    height: size === 'md' ? (isAmount ? '40px' : '48px') : '120px',
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
