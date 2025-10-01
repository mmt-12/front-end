import { css } from '@emotion/react'

import { Skeleton, SkeletonText } from '@/components/common/Skeleton'

export default function BadgeListSkeleton({
  isExpanded = false,
}: {
  isExpanded?: boolean
}) {
  if (!isExpanded) {
    return (
      <div css={compactContainerStyle}>
        <Skeleton height={28} width={48} radius={32} />
        <Skeleton height={28} width={60} radius={32} />
        <Skeleton height={28} width={80} radius={32} />
        <Skeleton height={28} width={52} radius={32} />
        <Skeleton height={28} width={128} radius={32} />
        <Skeleton height={28} width={56} radius={32} />
        <Skeleton height={28} width={60} radius={32} />
      </div>
    )
  }

  return (
    <div css={expandedContainerStyle}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div css={rowStyle} key={idx}>
          <Skeleton height={28} width={80} radius={32} />
          <SkeletonText lines={1} width={160} />
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
  gap: '8px',
})
const expandedContainerStyle = css({
  width: '100%',
  padding: '8px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})
const rowStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})
