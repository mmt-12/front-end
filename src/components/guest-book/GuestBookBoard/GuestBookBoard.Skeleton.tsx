import { css } from '@emotion/react'

import { Skeleton } from '@/components/common/Skeleton'
import { flexGap } from '@/styles/common'

export default function GuestBookBoardSkeleton() {
  return (
    <div css={[containerStyle, flexGap(16)]}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} width='100%' height={37} radius={4} />
      ))}
    </div>
  )
}

const containerStyle = css({
  width: '100%',
})
