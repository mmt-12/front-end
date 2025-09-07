import { useLocation, useMatch, useParams } from 'react-router-dom'

import { useCreateGuestBookReaction } from '@/api'
import { useCreateEmojiComment, useCreateVoiceComment } from '@/api/post'
import { useUserStore } from '@/store/userStore'
import type { IMemoryInfo } from '@/types/memory'

export function useReactionPicker(type: 'EMOJI' | 'VOICE') {
  const { communityId } = useUserStore()
  const location = useLocation()
  const memory = location.state?.memory as IMemoryInfo | undefined
  const { id } = useParams()
  const entityId = Number(id)

  const isPostDetailPage = useMatch('/post/:id')
  const isGuestBookPage = useMatch('/guest-book/:id')

  const { mutate: createEmojiComment } = useCreateEmojiComment(
    communityId,
    memory?.id ?? 1,
    entityId,
  )
  const { mutate: createVoiceComment } = useCreateVoiceComment(
    communityId,
    memory?.id ?? 1,
    entityId,
  )

  const { mutate: createGuestBookReaction } = useCreateGuestBookReaction(
    communityId,
    entityId,
  )

  const selectReaction = (reactionId: number) => {
    if (!entityId) return

    if (isPostDetailPage) {
      if (type === 'EMOJI') {
        createEmojiComment({ emojiId: reactionId })
      } else {
        createVoiceComment({ voiceId: reactionId })
      }
    } else if (isGuestBookPage) {
      createGuestBookReaction({ type, contentId: reactionId })
    }
  }

  return { selectReaction }
}
