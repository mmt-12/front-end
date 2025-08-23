import { useMemo, useState } from 'react'
import { css, type Theme } from '@emotion/react'
import { UserRounded } from '@solar-icons/react'
import { Link } from 'react-router-dom'

import Chip from '@/components/common/Chip'
import InputField from '@/components/common/InputField'
import Profile from '@/components/common/Profile'
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
    <div css={containerStyle}>
      <div css={[flexGap(12, 'row'), searchBarWrapperStyle]}>
        <InputField onChange={setSearchTerm} />
        <Chip
          customCss={css({ backgroundColor: 'transparent' })}
          Icon={UserRounded}
          label={memberData.length}
        />
      </div>
      {filteredMembers.map(member => (
        <Link to={ROUTES.GUEST_BOOK(member.id)}>
          <Profile key={member.id} {...member} />
        </Link>
      ))}
    </div>
  )
}

const containerStyle = css({
  padding: '4px 16px',
})

const searchBarWrapperStyle = (theme: Theme) =>
  css({
    padding: '10px 0',
    '> div:first-of-type': {
      flex: 1,
      margin: '0 !important',
    },
    input: {
      padding: '10px 12px !important',
      outline: `1.5px solid ${theme.stone[300]}`,
    },
  })
