import type { MouseEvent } from 'react'
import { useParams } from 'react-router-dom'

import {
  useCreateEmojiComment,
  useCreateVoiceComment,
  type Post as PostType,
} from '@/api'
import Border from '@/components/common/Border'
import { useUserStore } from '@/store/userStore'
import { flexGap } from '@/styles/common'
import EmojiList from '../../reaction/EmojiList'
import VoiceList from '../../reaction/VoiceList'
import PostContent from '../PostContent/PostContent'

export default function PostListItem(props: PostType) {
  const { communityId } = useUserStore()
  const { memoryId } = useParams()

  const { mutate: commentEmoji } = useCreateEmojiComment(
    communityId,
    Number(memoryId),
    props.id,
  )

  const { mutate: commentVoice } = useCreateVoiceComment(
    communityId,
    Number(memoryId),
    props.id,
  )

  const handleEmojiClick = (e: MouseEvent, _id: number) => {
    e.stopPropagation()

    commentEmoji({ emojiId: _id })
  }

  const handleVoiceClick = (e: MouseEvent, _id: number) => {
    e.stopPropagation()

    commentVoice({ voiceId: _id })
  }
  return (
    <>
      <div css={[flexGap(10), { marginBottom: '32px' }]}>
        <div>
          <Border />
          <PostContent {...props} link />
        </div>
        <EmojiList
          reactions={props.comments.emojis}
          onClick={handleEmojiClick}
        />
        <VoiceList
          reactions={props.comments.voices}
          onClick={handleVoiceClick}
        />
      </div>
    </>
  )
}
