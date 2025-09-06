import { css } from '@emotion/react'

import { SkeletonCircle } from '@/components/common/Skeleton'

export default function MbtiChartSkeleton() {
  return (
    <div css={container}>
      <SkeletonCircle size={140} />
    </div>
  )
}

const container = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
