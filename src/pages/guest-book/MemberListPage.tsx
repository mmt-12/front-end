import { useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { UserRounded } from '@solar-icons/react'
import { Link } from 'react-router-dom'

import { useAssociateList } from '@/api'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import Profile from '@/components/common/Profile'
import SearchBar from '@/components/common/SearchBar'
import useHeader from '@/hooks/useHeader'
import { ROUTES } from '@/routes/ROUTES'
import { flexGap } from '@/styles/common'
import { filterByStringProp } from '@/utils/filter'

export default function MemberListPage() {
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

  if (!memberData) return null

  return (
    <>
      <SearchBar
        onChange={setSearchTerm}
        icon={UserRounded}
        count={filteredMembers.length}
      />
      <InfiniteScroll
        fetchNext={() => fetchNextPage()}
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
