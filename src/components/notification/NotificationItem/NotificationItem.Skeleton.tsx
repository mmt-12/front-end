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
          <SkeletonCircle size={24} />
        </div>
        <div css={{ width: '100%' }}>
          <div css={infoRowStyle}>
            <Skeleton height={12} width={'50%'} />
            <Skeleton height={12} width={60} />
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
  width: 40,
  height: 40,
  padding: 8,
  borderRadius: '50%',
})
const infoRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 8,
})
