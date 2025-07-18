import { BADGES } from '@/consts/BADGES'
import { css } from '@emotion/react'
import Medal from './Medal'

export interface IBadgeProps {
  name: string
}

export default function Badge({ name }: IBadgeProps) {
  if (!BADGES[name]) return null

  return (
    <div
      css={[
        badgeStyle,
        {
          backgroundColor: BADGES[name].backgroundColor,
          color: BADGES[name].color,
          border: `2px solid ${BADGES[name].border}`,
        },
      ]}
    >
      <Medal name={name} />
      <span>{name}</span>
    </div>
  )
}

const badgeStyle = css({
  height: '32px',
  padding: '2px 8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '32px',
})
