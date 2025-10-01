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
          <Link
            to={ROUTES.GUEST_BOOK(author.id)}
            key={author.id}
            className='lg'
            css={profileWrapperStyle}
          >
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
  padding: 4,
  paddingBottom: 32,

  display: 'flex',
  flexDirection: 'column',
  gap: 12,
})

const reactionNameStyle = (theme: Theme) => ({
  padding: '4px 12px',

  display: 'flex',
  alignItems: 'center',
  gap: 6,
  color: theme.colors.stone[500],
})

const reactedProfilesStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const profileWrapperStyle = css({
  padding: '4px 8px',
})
