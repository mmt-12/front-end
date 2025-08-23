import { css, type Theme } from '@emotion/react'

import defaultImageUrl from '@/assets/images/mascot/default-profile.png'
import Badge from '@/components/common/Badge'
import type { IMember } from '@/types'

export interface Props extends IMember {
  size?: 'sm' | 'md'
}

export default function Profile({
  name,
  imageUrl,
  badgeId,
  description,
  size = 'md',
}: Props) {
  return (
    <div css={containerStyle(size)}>
      <div css={imageWrapperStyle(size)}>
        <img
          src={imageUrl ? imageUrl : defaultImageUrl}
          alt={name}
          onError={e => {
            e.currentTarget.src = defaultImageUrl
          }}
          css={imageStyle}
        />
      </div>
      <div css={contentStyle}>
        <div>
          <p css={nameStyle(size)}>{name}</p>
          {badgeId && <Badge id={badgeId} />}
        </div>
        {description && (
          <p css={descriptionStyle} className='stardust'>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

const containerStyle = (size: 'sm' | 'md') =>
  css({
    width: size === 'md' ? '100%' : 'auto',
    padding: size === 'md' ? 8 : 0,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  })

const contentStyle = css({
  padding: '2px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  overflow: 'hidden',
  '>div': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
  },
})

const nameStyle = (size: 'sm' | 'md') =>
  css({
    margin: 0,
    fontSize: '16px',
    fontWeight: size === 'md' ? 'bold' : '500',
  })

const imageWrapperStyle = (size: 'sm' | 'md') =>
  css({
    width: size === 'sm' ? '36px' : '64px',
    height: size === 'sm' ? '36px' : '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '50%',
    overflow: 'hidden',
  })

const imageStyle = css({
  width: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
})

const descriptionStyle = (theme: Theme) =>
  css({
    overflow: 'hidden',
    width: '100%',
    margin: 0,
    fontSize: '14px',
    color: theme.stone[500],
    textOverflow: 'ellipsis',
  })
