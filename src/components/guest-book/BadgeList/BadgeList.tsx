import { css, type Theme } from '@emotion/react'

import { useAchievements } from '@/api'
import Badge from '@/components/common/Badge'
import NoContentFallback from '@/components/common/NoContentFallback'
import BadgeListSkeleton from './BadgeList.Skeleton'

interface Props {
  communityId: number
  associateId: number
  isExpanded?: boolean
}

export default function BadgeList({
  communityId,
  associateId,
  isExpanded = false,
}: Props) {
  const { data } = useAchievements(communityId, associateId)

  if (!data) return <BadgeListSkeleton isExpanded={isExpanded} />

  const visibleBadges = data.achievements.filter(
    badge => badge.type !== 'HIDDEN',
  )

  if (visibleBadges.length === 0) {
    return (
      <NoContentFallback size='block' message='아직 획득한 칭호가 없어요. 🥲' />
    )
  }

  if (!isExpanded) {
    const badgesToShow = visibleBadges.slice(0, 4)
    const hiddenCount = visibleBadges.length - badgesToShow.length

    return (
      <div css={compactContainerStyle}>
        {badgesToShow.map(badge => (
          <Badge key={badge.id} id={badge.id} />
        ))}
        {hiddenCount > 0 && <div css={moreCountStyle}>+{hiddenCount}</div>}
      </div>
    )
  }

  return (
    <div css={expandedContainerStyle}>
      {visibleBadges.map(badge => (
        <div css={medalInfoStyle} key={badge.id}>
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
    color: theme.colors.stone[900],
  })
