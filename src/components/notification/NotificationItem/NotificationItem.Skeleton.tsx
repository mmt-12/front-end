import { css } from '@emotion/react'

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@/components/common/Skeleton'

export default function NotificationItemSkeleton() {
  return (
    <div>
      <div css={containerStyle}>
        <div css={iconWrapperStyle}>
          <SkeletonCircle size={38} />
        </div>
        <div css={{ width: '100%' }}>
          <div css={infoRowStyle}>
            <Skeleton height={12} width={40} />
            <Skeleton height={12} width={80} />
          </div>
          <SkeletonText lines={1} width={'70%'} />
        </div>
      </div>
    </div>
  )
}

const containerStyle = css({
  boxSizing: 'border-box',
  width: '100%',
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
})
const iconWrapperStyle = css({
  flexShrink: 0,
})
const infoRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 16,
})
