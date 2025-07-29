import { BADGES } from '@/consts/BADGES'
import { css } from '@emotion/react'
import WavyBox from '../WavyBox'

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
      borderRadius={20}
      customCss={badgeStyle(BADGES[id].color)}
    >
      <Icon size={16} color={BADGES[id].color} weight='Bold' />
      <span data-testid={`badge-${id}`}>{BADGES[id].name}</span>
    </WavyBox>
  )
}

const badgeStyle = (color: string) =>
  css({
    padding: '4px 10px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 800,
    fontFamily: 'PFStardust',
    gap: '4px',
    color,
    borderRadius: '20px',
  })
