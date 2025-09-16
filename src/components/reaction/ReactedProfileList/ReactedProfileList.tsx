import { css, type Theme } from '@emotion/react'
import { MagniferZoomIn } from '@solar-icons/react'

import type { Comment } from '@/api'
import Profile from '@/components/member/Profile'

interface Props {
  selectedReaction?: Comment
}

export default function ReactedProfileList({ selectedReaction }: Props) {
  if (!selectedReaction) return null
  return (
    <div css={reactionDetailStyle}>
      <div css={reactionNameStyle}>
        <p>:{selectedReaction.name}:</p>
        <MagniferZoomIn weight='Linear' size={20} />
      </div>
      <div css={reactedProfilesStyle}>
        {selectedReaction.authors.map(author => (
          <Profile
            key={author.id}
            {...author}
            size='sm'
            introduction={undefined}
          />
        ))}
      </div>
    </div>
  )
}

const reactionDetailStyle = css({
  padding: 12,

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
