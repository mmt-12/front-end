import { css } from '@emotion/react'

import { BADGES } from '@/consts/BADGES'
import WavyBox from '../../guest-book/WavyBox'

interface Props {
  id: number
}

export default function Badge({ id }: Props) {
  if (!BADGES[id]) return null

  const Icon = BADGES[id].icon

  return (
    <WavyBox
      strokeColor={BADGES[id].border}
      strokeWidth={1.5}
      backgroundColor={BADGES[id].backgroundColor}
      borderRadius={12}
    >
      <div css={badgeStyle(BADGES[id].color)} className='stardust'>
        <Icon size={16} color={BADGES[id].color} weight='Bold' />
        <span data-testid={`badge-${id}`}>{BADGES[id].name}</span>
      </div>
    </WavyBox>
  )
}

const badgeStyle = (color: string) =>
  css({
    padding: '3.5px 8px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 800,
    gap: '4px',
    color,
    borderRadius: '20px',
  })
