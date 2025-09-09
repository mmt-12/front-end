import { css } from '@emotion/react'

import { Skeleton } from '@/components/common/Skeleton'
import MemoryInfoSkeleton from '../MemoryInfo/MemoryInfo.Skeleton'

export default function MemoryListItemSkeleton({
  isGrid = false,
}: {
  isGrid?: boolean
}) {
  return (
    <div css={containerStyle}>
      <MemoryInfoSkeleton description={!isGrid} />
      {isGrid ? (
        <div css={gridStyle}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <Skeleton key={idx} style={gridItemStyle} />
          ))}
        </div>
      ) : (
        <div css={imagesListStyle}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div css={skeletonWrapperStyle} key={idx}>
              <Skeleton height='100%' radius={0} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px',
  gap: '16px',
})

const skeletonWrapperStyle = css({
  flex: 1,
  aspectRatio: '1 / 1',
  width: '100%',
})

const imagesListStyle = css({
  height: 'fit-content',
  margin: '0px 8px',

  display: 'flex',
  gap: 4,
  overflow: 'hidden',
  borderRadius: 20,
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
