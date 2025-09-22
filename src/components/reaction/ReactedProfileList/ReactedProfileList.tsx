import { css, type Theme } from '@emotion/react'
import { MagniferZoomIn } from '@solar-icons/react'
import { Link } from 'react-router-dom'

import type { CommentAuthor } from '@/api'
import Profile from '@/components/member/Profile'
import { ROUTES } from '@/routes/ROUTES'

interface Props {
  name?: string
  authors?: CommentAuthor[]
}

export default function ReactedProfileList({ name, authors }: Props) {
  if (!authors || authors.length === 0) return null
  return (
    <div css={reactionDetailStyle}>
      <div css={reactionNameStyle}>
        <p>:{name}:</p>
        <MagniferZoomIn weight='Linear' size={20} />
      </div>
      <div css={reactedProfilesStyle}>
        {authors.map(author => (
          <Link to={ROUTES.GUEST_BOOK(author.id)} key={author.id}>
            <Profile
              key={author.id}
              {...author}
              size='sm'
              introduction={undefined}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

const reactionDetailStyle = css({
  padding: 12,
  paddingBottom: 32,

  display: 'flex',
  flexDirection: 'column',
  gap: 20,
})

const reactionNameStyle = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.colors.stone[500],
})

const reactedProfilesStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})
