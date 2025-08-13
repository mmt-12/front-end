import Emoji from '@/components/common/Emoji'
import Voice from '@/components/common/Voice'
import { css, type Theme } from '@emotion/react'
import PostContent from '../PostContent/PostContent'
import ReactionList from '../ReactionList'
import type { MouseEvent } from 'react'
import { emojies, voices } from '@/mocks/data/reaction'
import type { IMember } from '@/types'

export interface Props {
  id: number
  images: string[]
  content: string
  author: IMember
  createdAt: Date
}

export default function Post(props: Props) {
  const handleReactionClick = (
    e: MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.stopPropagation()
    console.log(`Reaction clicked: ${id}`)
  }
  return (
    <div css={containerStyle}>
      <PostContent {...props} />
      <ReactionList>
        {emojies.map(emoji => (
          <Emoji
            key={emoji.id}
            {...emoji}
            amount={undefined}
            onClick={handleReactionClick}
          />
        ))}
      </ReactionList>
      <ReactionList>
        {voices.map(voice => (
          <Voice
            key={voice.id}
            {...voice}
            amount={undefined}
            onClick={handleReactionClick}
          />
        ))}
      </ReactionList>
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderTop: `1px solid ${theme.stone[150]}`,
  })
