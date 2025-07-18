import { ACHIEVEMENTS } from '@/consts/ACHIEVEMENTS.tsx'
import { css } from '@emotion/react'

export interface IBadgeProps {
  name: string
}

export default function Badge({ name }: IBadgeProps) {
  if (!ACHIEVEMENTS[name]) return null

  return (
    <div
      css={[
        badgeStyle,
        {
          backgroundColor: ACHIEVEMENTS[name].backgroundColor,
          color: ACHIEVEMENTS[name].color,
          border: `2px solid ${ACHIEVEMENTS[name].border}`,
        },
      ]}
    >
      <div>{ACHIEVEMENTS[name].icon}</div>
      <span>{ACHIEVEMENTS[name].name}</span>
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
