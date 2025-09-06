import { css } from '@emotion/react'

import { Skeleton } from '@/components/common/Skeleton'
import { flexGap } from '@/styles/common'

export default function GuestBookBoardSkeleton() {
  return (
    <div css={[containerStyle, flexGap(16)]}>
      <div css={inputFieldCss}>
        <Skeleton width='100%' height={47} radius={12} />
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} width='100%' height={37} radius={4} />
      ))}
    </div>
  )
}

const containerStyle = css({
  width: '100%',
})

const inputFieldCss = css({
  margin: '12px 0',
})
