import { css } from '@emotion/react'

import { Skeleton } from '../Skeleton'

export default function ProfileImageListSkeleton() {
  return (
    <div css={imagesGridStyle}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} height={''} radius={0} />
      ))}
    </div>
  )
}

const imagesGridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '4px',
  '>div': {
    aspectRatio: '1 / 1',
    width: '100%',
  },
})
