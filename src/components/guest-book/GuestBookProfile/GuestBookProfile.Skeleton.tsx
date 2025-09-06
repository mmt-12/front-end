import { css } from '@emotion/react'

import { Skeleton, SkeletonText } from '@/components/common/Skeleton'

export default function GuestBookProfileSkeleton() {
  return (
    <div css={containerStyle}>
      <div css={imageWrapperStyle}>
        <Skeleton width={115} height={115} radius={8} />
      </div>
      <div css={contentStyle}>
        <div css={headerStyle}>
          <Skeleton height={22} width={120} radius={20} />
        </div>
        <SkeletonText lines={1} width={'30%'} />
        <div css={{ marginTop: 8 }}>
          <SkeletonText lines={2} width={'90%'} />
        </div>
      </div>
    </div>
  )
}

const containerStyle = css({
  width: '100%',
  padding: '0 4px',
  display: 'inline-flex',
  gap: '18px',
  whiteSpace: 'nowrap',
})
const contentStyle = css({
  padding: '4px 0',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 4,
})
const headerStyle = css({ display: 'flex', alignItems: 'center', gap: 8 })
const imageWrapperStyle = css({ position: 'relative' })
