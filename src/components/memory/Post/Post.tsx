import type { MouseEvent } from 'react'

import Border from '@/components/common/Border/Border'
import Spacing from '@/components/common/Spacing'
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
    <>
      <Border />
      <Spacing height={10} />
      <PostContent {...props} />
      <Spacing height={10} />
      <EmojiList reactions={emojies} onClick={handleReactionClick} />
      <Spacing height={10} />
      <VoiceList reactions={voices} onClick={handleReactionClick} />
      <Spacing height={20} />
    </>
  )
}
