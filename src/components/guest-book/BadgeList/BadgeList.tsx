import { css, type Theme } from '@emotion/react'
import { ACHIEVEMENTS } from '@/mocks/data/guestBook'
import Badge from '@/components/common/Badge'

interface Props {
  isExpanded?: boolean
}

export default function BadgeList({ isExpanded = false }: Props) {
  const badgeListData = ACHIEVEMENTS

  if (!isExpanded) {
    const visibleBadges = badgeListData
      .filter(badge => badge.type !== 'HIDDEN')
      .slice(0, 4)
    const hiddenCount =
      badgeListData.filter(badge => badge.type !== 'HIDDEN').length -
      visibleBadges.length

    return (
      <div css={compactContainerStyle} className='stardust'>
        {visibleBadges.map(badge => (
          <Badge key={badge.id} id={badge.id} />
        ))}
        {hiddenCount > 0 && <div css={moreCountStyle}>+{hiddenCount}</div>}
      </div>
    )
  }

  return (
    <div css={expandedContainerStyle}>
      {badgeListData
        .filter(badge => badge.type !== 'HIDDEN')
        .map(badge => (
          <div css={medalInfoStyle} className='stardust'>
            <Badge key={badge.id} id={badge.id} />
            <p css={conditionStyle}>
              {badge.type === 'RESTRICTED' && !badge.isObtained
                ? '???'
                : badge.condition}
            </p>
          </div>
        ))}
    </div>
  )
}

const compactContainerStyle = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '12px',
})

const moreCountStyle = css({
  fontSize: '14px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
})

const expandedContainerStyle = css({
  width: '100%',
  padding: '8px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  whiteSpace: 'normal',
})

const medalInfoStyle = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const conditionStyle = (theme: Theme) =>
  css({
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.stone[900],
  })
