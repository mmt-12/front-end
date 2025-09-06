import { css } from '@emotion/react'

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@/components/common/Skeleton'

export default function MemoryListItemSkeleton({
  isGrid = false,
}: {
  isGrid?: boolean
}) {
  if (isGrid) {
    return (
      <div css={gridContainerStyle}>
        <div css={headerStyle}>
          <Skeleton height={20} width='50%' />
          <div css={chipRowStyle}>
            <Skeleton width={40} height={24} radius={16} />
            <Skeleton width={40} height={24} radius={16} />
          </div>
        </div>
        <div css={metaStyle}>
          <Skeleton height={12} width='30%' />
          <Skeleton height={12} width='30%' />
        </div>

        <div css={gridStyle}>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </div>
      </div>
    )
  } else
    return (
      <div css={containerStyle}>
        <div css={headerStyle}>
          <Skeleton height={20} width='60%' />
          <div css={chipRowStyle}>
            <SkeletonCircle size={20} />
            <SkeletonCircle size={20} />
          </div>
        </div>
        <div css={metaStyle}>
          <Skeleton height={12} width='40%' />
          <Skeleton height={12} width='30%' />
        </div>
        {!isGrid && <SkeletonText lines={2} width='80%' />}
        {isGrid ? (
          <div css={gridStyle}>
            <Skeleton height={120} />
          </div>
        ) : (
          <div css={imagesListStyle}>
            <Skeleton height={88} />
            <Skeleton height={88} />
            <Skeleton height={88} />
          </div>
        )}
      </div>
    )
}

const gridContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 4px',
  gap: '8px',
})

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  gap: '8px',
})

const headerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
})
const chipRowStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginLeft: 'auto',
})
const metaStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
})
const imagesListStyle = css({
  display: 'flex',
  gap: 4,
  '> div': { flex: 1, borderRadius: 12, overflow: 'hidden' },
})

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '4px',
  img: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    overflow: 'hidden',
    objectPosition: 'center',
  },
})
