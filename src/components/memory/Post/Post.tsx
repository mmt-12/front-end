import Emoji from '@/components/common/Emoji'
import Voice from '@/components/common/Voice'
import { css } from '@emotion/react'
import PostContent from '../PostContent/PostContent'
import ReactionList from '../ReactionList'
import type { MouseEvent } from 'react'
import { emojies, voices } from '@/mocks/data/reaction'

export interface Props {
  id: string
  images: string[]
  content: string
  author: {
    id: string
    name: string
    imageUrl: string
  }
  createdAt: Date
}

export default function Post(props: Props) {
  const handleReactionClick = (e: MouseEvent<HTMLDivElement>, id: string) => {
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

const containerStyle = css({
  padding: '12px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})
