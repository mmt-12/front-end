import { css } from '@emotion/react'
import Badge from '../Badge'

export interface Props {
  id: string
  name: string
  imageUrl?: string
  badgeId?: number
  description?: string
}

export default function Profile(props: Props) {
  return (
    <div css={containerStyle}>
      <img src={props.imageUrl} alt={props.name} />
      <h2>{props.name}</h2>
      {props.description && <p>{props.description}</p>}
      {props.badgeId && <Badge id={props.badgeId} />}
    </div>
  )
}

const containerStyle = css({
  padding: 8,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  img: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  h2: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  p: {
    margin: 0,
    fontSize: '14px',
    color: '#666',
  },
})
