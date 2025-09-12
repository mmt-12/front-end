import { css } from '@emotion/react'

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@/components/common/Skeleton'

export default function PostSkeleton() {
  return (
    <div css={wrapper}>
      <div css={headerStyle}>
        <SkeletonCircle size={36} />
        <Skeleton height={14} width='30%' />
        <Skeleton height={12} width='20%' css={timeStyle} />
      </div>
      <div css={albumStyle}>
        <Skeleton height={360} />
      </div>
      <div css={contentStyle}>
        <SkeletonText lines={2} width='70%' />
      </div>
      <div css={reactionsStyle}>
        <Skeleton width={48} height={48} radius={8} />
        <Skeleton width={48} height={48} radius={8} />
        <Skeleton width={48} height={48} radius={8} />
      </div>
      <div css={reactionsStyle}>
        <Skeleton height={36} width={120} radius={24} />
        <Skeleton height={36} width={80} radius={24} />
        <Skeleton height={36} width={100} radius={24} />
      </div>
    </div>
  )
}

const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginBottom: 32,
})
const headerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '8px 12px',
})
const timeStyle = css({ marginLeft: 'auto' })
const albumStyle = css({
  padding: '0 12px',
  borderRadius: 16,
  overflow: 'hidden',
})
const contentStyle = css({ padding: '8px 16px' })
const reactionsStyle = css({ display: 'flex', gap: 8, padding: '0 16px' })
