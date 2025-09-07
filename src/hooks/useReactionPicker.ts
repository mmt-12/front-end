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

  const { mutate: createEmojiComment, isPending: isEmojiPending } =
    useCreateEmojiComment(communityId, memory?.id ?? 1, entityId)
  const { mutate: createVoiceComment, isPending: isVoicePending } =
    useCreateVoiceComment(communityId, memory?.id ?? 1, entityId)
  const { mutate: createGuestBookReaction, isPending: isGuestBookPending } =
    useCreateGuestBookReaction(communityId, entityId)

  const selectReaction = (reactionId: number) => {
    if (!entityId || isEmojiPending || isVoicePending || isGuestBookPending)
      return

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
