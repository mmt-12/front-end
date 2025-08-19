import type { MouseEvent } from 'react'
import { css, type Theme } from '@emotion/react'

import { emojies, voices } from '@/mocks/data/reaction'
import type { IMember } from '@/types'
import EmojiList from '../../reaction/EmojiList'
import VoiceList from '../../reaction/VoiceList'
import PostContent from '../PostContent/PostContent'

export interface Props {
  id: number
  images: string[]
  content: string
  author: IMember
  createdAt: Date
}

export default function Post(props: Props) {
  const handleReactionClick = (e: MouseEvent, id: number) => {
    e.stopPropagation()
    console.log(`Reaction clicked: ${id}`)
  }
  return (
    <div css={containerStyle}>
      <PostContent {...props} />
      <EmojiList reactions={emojies} onClick={handleReactionClick} />
      <VoiceList reactions={voices} onClick={handleReactionClick} />
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
