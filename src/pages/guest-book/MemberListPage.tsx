import { useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { UserRounded } from '@solar-icons/react'
import { Link } from 'react-router-dom'

import { useAssociateList } from '@/api'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import Profile, { ProfileSkeleton } from '@/components/common/Profile'
import SearchBar from '@/components/common/SearchBar'
import { Skeleton } from '@/components/common/Skeleton'
import useHeader from '@/hooks/useHeader'
import useStardust from '@/hooks/useStardust'
import { ROUTES } from '@/routes/ROUTES'
import { flexGap } from '@/styles/common'
import { filterByStringProp } from '@/utils/filter'

export default function MemberListPage() {
  useStardust()
  const [searchTerm, setSearchTerm] = useState('')
  const {
    data: memberData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAssociateList(1)

  const filteredMembers = useMemo(() => {
    const associates = memberData?.pages.flatMap(page => page.associates) || []

    return filterByStringProp(associates, 'nickname', searchTerm)
  }, [searchTerm, memberData])

  useHeader({
    routeName: '멤버',
  })

  if (!memberData)
    return (
      <div css={[flexGap(14), css({ margin: '14px 16px' })]}>
        <div css={[flexGap(12, 'row'), css({ alignItems: 'center' })]}>
          <Skeleton width='100%' height={37} radius={12} />
          <Skeleton width={44} height={20} radius={20} />
        </div>
        <div css={flexGap(8)}>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <ProfileSkeleton key={index} />
            ))}
        </div>
      </div>
    )

  return (
    <>
      <SearchBar
        onChange={setSearchTerm}
        icon={UserRounded}
        count={filteredMembers.length}
      />
      <InfiniteScroll
        fetchNext={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNextPage}
      >
        <div css={[flexGap(8), css({ margin: '0 16px 16px' })]}>
          {filteredMembers.map(member => (
            <Link to={ROUTES.GUEST_BOOK(member.id)} key={member.id}>
              <Profile {...member} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
}
