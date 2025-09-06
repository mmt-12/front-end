import type { MouseEvent } from 'react'

import type { Post as PostType } from '@/api'
import Border from '@/components/common/Border'
import { flexGap } from '@/styles/common'
import EmojiList from '../../reaction/EmojiList'
import VoiceList from '../../reaction/VoiceList'
import PostContent from '../PostContent/PostContent'

export default function Post(props: PostType) {
  const handleReactionClick = (e: MouseEvent, _id: number) => {
    e.stopPropagation()
  }
  return (
    <>
      <div css={[flexGap(10), { marginBottom: '32px' }]}>
        <div>
          <Border />
          <PostContent {...props} />
        </div>
        <EmojiList
          reactions={props.comments.emojis}
          onClick={handleReactionClick}
        />
        <VoiceList
          reactions={props.comments.voices}
          onClick={handleReactionClick}
        />
      </div>
    </>
  )
}
