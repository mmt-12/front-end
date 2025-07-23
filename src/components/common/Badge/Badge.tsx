import { BADGES } from '@/consts/BADGES'
import { css } from '@emotion/react'

interface Props {
  id: number
}

export default function Badge({ id }: Props) {
  if (!BADGES[id]) return null

  const Icon = BADGES[id].icon

  return (
    <div
      css={[
        badgeStyle,
        {
          backgroundColor: BADGES[id].backgroundColor,
          color: BADGES[id].color,
          border: `2px solid ${BADGES[id].border}`,
        },
      ]}
    >
      <Icon size={16} color={BADGES[id].color} weight='Bold' />
      <span>{BADGES[id].name}</span>
    </div>
  )
}

const badgeStyle = css({
  padding: '4px 8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 800,
  fontFamily: 'PFStardust',
  borderRadius: '20px',
  gap: '4px',
})
