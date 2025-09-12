import { Skeleton } from '@/components/common/Skeleton'
import { flexGap } from '@/styles/common'

export default function GuestBookBoardSkeleton() {
  return (
    <div css={[flexGap(16), { width: '100%' }]}>
      <Skeleton width='100%' height={32} radius={8} />
      <Skeleton width='100%' height={96} radius={8} />
      <Skeleton width='100%' height={32} radius={8} />
      <Skeleton width='100%' height={60} radius={8} />
    </div>
  )
}
