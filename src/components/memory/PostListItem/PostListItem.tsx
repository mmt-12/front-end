import type { MouseEvent } from 'react'
import { useParams } from 'react-router-dom'

import { type Post as PostType } from '@/api'
import { useToggleEmojiComment, useToggleVoiceComment } from '@/api/post'
import Post from '@/components/memory/Post'
import { useUserStore } from '@/store/userStore'

export default function PostListItem(props: PostType) {
  const { communityId, associateId } = useUserStore()
  const { memoryId } = useParams()

  const { mutate: toggleEmoji } = useToggleEmojiComment(
    communityId,
    Number(memoryId),
    props.id,
    associateId,
  )

  const { mutate: toggleVoice } = useToggleVoiceComment(
    communityId,
    Number(memoryId),
    props.id,
    associateId,
  )

  const handleEmojiClick = (e: MouseEvent, id: number) => {
    e.stopPropagation()
    toggleEmoji({ emojiId: id, comments: props.comments.emojis })
  }

  const handleVoiceClick = (e: MouseEvent, id: number) => {
    e.stopPropagation()
    toggleVoice({ voiceId: id, comments: props.comments.voices })
  }
  return (
    <Post
      post={props}
      onEmojiClick={handleEmojiClick}
      onVoiceClick={handleVoiceClick}
      size='sm'
      link
    />
  )
}
