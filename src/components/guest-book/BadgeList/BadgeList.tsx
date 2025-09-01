import { css, type Theme } from '@emotion/react'

import { useAchievements } from '@/api'
import Badge from '@/components/common/Badge'

interface Props {
  isExpanded?: boolean
}

export default function BadgeList({ isExpanded = false }: Props) {
  const userId = 1
  const { data } = useAchievements(1, userId)

  if (!data) return null

  if (!isExpanded) {
    const visibleBadges = data.achievements
      .filter(badge => badge.type !== 'HIDDEN')
      .slice(0, 4)
    const hiddenCount =
      data.achievements.filter(badge => badge.type !== 'HIDDEN').length -
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
      {data.achievements
        .filter(badge => badge.type !== 'HIDDEN')
        .map(badge => (
          <div css={medalInfoStyle} className='stardust' key={badge.id}>
            <Badge key={badge.id} id={badge.id} />
            <p css={conditionStyle}>
              {badge.type === 'RESTRICTED' && !badge.obtained
                ? '???'
                : badge.criteria}
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
