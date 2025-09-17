import type { MouseEvent } from 'react'
import { useParams } from 'react-router-dom'

import {
  useCreateEmojiComment,
  useCreateVoiceComment,
  useDeleteComment,
  type Post as PostType,
} from '@/api'
import Post from '@/components/memory/Post'
import { useUserStore } from '@/store/userStore'

export default function PostListItem(props: PostType) {
  const { communityId, associateId } = useUserStore()
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

  const { mutate: deleteComment } = useDeleteComment(
    communityId,
    Number(memoryId),
    props.id,
  )

  const handleEmojiClick = (e: MouseEvent, id: number) => {
    e.stopPropagation()

    if (props.comments.emojis.find(emoji => emoji.id === id)?.involved) {
      const commentId = props.comments.emojis
        .find(emoji => emoji.id === id)
        ?.authors.find(author => author.id === associateId)?.commentId
      if (commentId) deleteComment(commentId)
    } else commentEmoji({ emojiId: id })
  }

  const handleVoiceClick = (e: MouseEvent, id: number) => {
    e.stopPropagation()

    if (props.comments.voices.find(voice => voice.id === id)?.involved) {
      const commentId = props.comments.voices
        .find(voice => voice.id === id)
        ?.authors.find(author => author.id === associateId)?.commentId
      if (commentId) deleteComment(commentId)
    } else commentVoice({ voiceId: id })
  }
  return (
    <Post
      post={props}
      onEmojiClick={handleEmojiClick}
      onVoiceClick={handleVoiceClick}
      link
    />
  )
}
