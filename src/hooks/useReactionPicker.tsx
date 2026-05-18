import { useMatch, useParams } from 'react-router-dom'

import { useCreateGuestBookReaction } from '@/api'
import { useCreateEmojiComment, useCreateVoiceComment } from '@/api/post'
import { useUserStore } from '@/store/userStore'

export function useReactionPicker() {
  const { communityId } = useUserStore()
  const { memoryId, postId, associateId } = useParams()
  const entityId = Number(postId ?? associateId)

  const isPostDetailPage = useMatch('/memory/:memoryId')
  const isGuestBookPage = useMatch('/home/guest-book/:associateId')

  const { mutate: createEmojiComment, isPending: isEmojiPending } =
    useCreateEmojiComment(communityId, Number(memoryId), entityId)
  const { mutate: createVoiceComment, isPending: isVoicePending } =
    useCreateVoiceComment(communityId, Number(memoryId), entityId)
  const { mutate: createGuestBookReaction, isPending: isGuestBookPending } =
    useCreateGuestBookReaction(communityId, entityId)

  const selectReaction = (type: 'EMOJI' | 'VOICE', reactionId: number) => {
    if (!entityId || isEmojiPending || isVoicePending || isGuestBookPending)
      return

    if (isPostDetailPage) {
      if (type === 'EMOJI') {
        createEmojiComment({ emojiId: reactionId })
        console.log('createEmojiComment', reactionId)
      } else {
        createVoiceComment({ voiceId: reactionId })
        console.log('createVoiceComment', reactionId)
      }
    } else if (isGuestBookPage) {
      createGuestBookReaction({ type, contentId: reactionId })
      console.log('createGuestBookReaction', reactionId)
    } else {
      console.warn('Unknown page type for selecting reaction')
    }
  }

  return { selectReaction, isPostDetailPage, isGuestBookPage }
}
