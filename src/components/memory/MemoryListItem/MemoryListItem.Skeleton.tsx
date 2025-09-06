import { css } from '@emotion/react'

import { Skeleton, SkeletonText } from '@/components/common/Skeleton'

export default function MemoryListItemSkeleton({
  isGrid = false,
}: {
  isGrid?: boolean
}) {
  return (
    <div css={containerStyle(isGrid)}>
      <div css={headerStyle}>
        <Skeleton height={20} width='50%' />
        <div css={chipRowStyle}>
          <Skeleton width={40} height={24} radius={16} />
          <Skeleton width={40} height={24} radius={16} />
        </div>
      </div>
      <div css={metaStyle}>
        <Skeleton height={12} width='40%' />
        <Skeleton height={12} width='30%' />
      </div>
      {isGrid ? (
        <div css={gridStyle}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <Skeleton key={idx} style={gridItemStyle} />
          ))}
        </div>
      ) : (
        <>
          <SkeletonText lines={2} width='80%' />
          <div css={imagesListStyle}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton height={88} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const containerStyle = (isGrid: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    padding: isGrid ? '12px 4px' : '16px',
    gap: '16px',
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

const gridItemStyle = {
  width: '100%',
  height: '100%',
  aspectRatio: '1 / 1',
}
