import { useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { UserRounded } from '@solar-icons/react'
import { Link } from 'react-router-dom'

import Profile from '@/components/common/Profile'
import SearchBar from '@/components/common/SearchBar'
import useHeader from '@/hooks/useHeader'
import { MEMBERS } from '@/mocks/data/members'
import { ROUTES } from '@/routes/ROUTES'
import { flexGap } from '@/styles/common'
import { filterByStringProp } from '@/utils/filter'

export default function MemberPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const memberData = MEMBERS
  const filteredMembers = useMemo(
    () => filterByStringProp(memberData, 'name', searchTerm),
    [memberData, searchTerm],
  )

  useHeader({
    routeName: '멤버',
  })

  return (
    <>
      <SearchBar
        onChange={setSearchTerm}
        icon={UserRounded}
        count={memberData.length}
      />
      <div css={[flexGap(8), css({ margin: '0 16px 16px' })]}>
        {filteredMembers.map(member => (
          <Link to={ROUTES.GUEST_BOOK(member.id)} key={member.id}>
            <Profile {...member} />
          </Link>
        ))}
      </div>
    </>
  )
}
