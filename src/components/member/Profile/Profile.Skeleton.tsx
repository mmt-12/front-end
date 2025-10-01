import { css } from '@emotion/react'

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@/components/common/Skeleton'

export default function ProfileSkeleton({
  size = 'md',
}: {
  size?: 'sm' | 'md'
}) {
  const circle = size === 'sm' ? 36 : 64
  return (
    <div css={containerStyle(size)}>
      <div css={imageWrapperStyle(size)}>
        <SkeletonCircle size={circle} />
      </div>
      <div css={contentStyle}>
        <div css={nameRowStyle}>
          <Skeleton height={16} width={size === 'md' ? 80 : 60} />
          <Skeleton height={20} width={60} radius={20} />
        </div>
        {size === 'md' && <SkeletonText lines={1} width={'100%'} />}
      </div>
    </div>
  )
}

const containerStyle = (size: 'sm' | 'md') =>
  css({
    width: size === 'md' ? '100%' : 'auto',
    padding: size === 'md' ? 8 : 0,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  })
const contentStyle = css({
  width: '100%',
  padding: '2px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  overflow: 'hidden',
})
const nameRowStyle = css({ display: 'flex', alignItems: 'center', gap: 8 })
const imageWrapperStyle = (size: 'sm' | 'md') =>
  css({
    width: size === 'sm' ? '36px' : '64px',
    height: size === 'sm' ? '36px' : '64px',
    flexShrink: 0,
    borderRadius: '50%',
    overflow: 'hidden',
  })
