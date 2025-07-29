import { css, type Theme } from '@emotion/react'
import Badge from '../Badge'
import defaultImageUrl from '@/assets/mascot/default-profile.png'

export interface Props {
  name: string
  imageUrl?: string
  badgeId?: number
  description?: string
}

export default function Profile({
  name,
  imageUrl,
  badgeId,
  description,
}: Props) {
  return (
    <div css={containerStyle}>
      <img
        src={imageUrl ? imageUrl : defaultImageUrl}
        alt={name}
        onError={e => {
          e.currentTarget.src = defaultImageUrl
        }}
        css={imageStyle}
      />
      <div>
        <div>
          <h2 css={nameStyle}>{name}</h2>
          {badgeId && <Badge id={badgeId} />}
        </div>
        {description && <p css={descriptionStyle}>{description}</p>}
      </div>
    </div>
  )
}

const containerStyle = css({
  width: '100%',
  padding: 8,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '>div': {
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
  },
})

const nameStyle = css({
  margin: 0,
  fontSize: '16px',
  fontWeight: 'bold',
})

const imageStyle = css({
  width: '64px',
  height: '64px',
  flexShrink: 0,
  borderRadius: '50%',
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
    fontFamily: 'PFStardust',
  })
