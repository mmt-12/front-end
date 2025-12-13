import { useMemo, useRef, useState } from 'react'
import { css, type Theme } from '@emotion/react'

import { usePost } from '@/api'
import {
  useDeleteBubble,
  useToggleEmojiComment,
  useToggleVoiceComment,
} from '@/api/post'
import ReactBar from '@/components/memory/ReactBar/ReactBar'
import Popup from '@/components/popup/Popup'
import Post from '@/components/post/Post'
import { PostListItemSkeleton } from '@/components/post/PostListItem'
import ReactedProfileList from '@/components/reaction/ReactedProfileList/ReactedProfileList'
import { useUserStore } from '@/store/userStore'
import { flexGap, withSafeAreaBottom } from '@/styles/common'

interface Props {
  memoryId: string
  postId: number
}

export default function PostDetailPopup({ memoryId, postId }: Props) {
  const { communityId, associateId } = useUserStore()

  const { data: post } = usePost(communityId, Number(memoryId), Number(postId))
  const { mutate: toggleEmoji } = useToggleEmojiComment(
    communityId,
    Number(memoryId),
    Number(postId),
    associateId,
  )
  const { mutate: toggleVoice } = useToggleVoiceComment(
    communityId,
    Number(memoryId),
    Number(postId),
    associateId,
  )
  const { mutate: deleteBubble } = useDeleteBubble(
    communityId,
    Number(memoryId),
    Number(postId),
    associateId,
  )

  const initialSelectedId =
    post?.comments.emojis[0]?.id ??
    post?.comments.voices[0]?.id ??
    post?.comments.temporaryVoices[0]?.id ??
    -1

  const [selectedReactionId, setSelectedReactionId] =
    useState(initialSelectedId)
  const selectedReactionType = useRef<'EMOJI' | 'VOICE' | 'BUBBLE'>('EMOJI')

  const selectedReaction = useMemo(() => {
    console.log(selectedReactionType.current, selectedReactionId)
    if (selectedReactionType.current === 'EMOJI') {
      return post?.comments.emojis.find(
        emoji => emoji.id === selectedReactionId,
      )
    } else if (selectedReactionType.current === 'VOICE') {
      return post?.comments.voices.find(
        voice => voice.id === selectedReactionId,
      )
    } else {
      return post?.comments.temporaryVoices.find(
        bubble => bubble.id === selectedReactionId,
      )
    }
  }, [post, selectedReactionId])

  if (!post)
    return (
      <div css={[flexGap(10), { marginBottom: '32px' }]}>
        <PostListItemSkeleton />
      </div>
    )

  const onEmojiClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (selectedReactionType.current === 'EMOJI' && selectedReactionId === id) {
      toggleEmoji({ emojiId: id, comments: post.comments.emojis }) // toggle off
      return
    }
    selectedReactionType.current = 'EMOJI'
    setSelectedReactionId(id)
  }

  const onVoiceClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (selectedReactionType.current === 'VOICE' && selectedReactionId === id) {
      toggleVoice({ voiceId: id, comments: post.comments.voices }) // toggle off
      return
    }
    selectedReactionType.current = 'VOICE'
    setSelectedReactionId(id)
  }

  const onBubbleClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (
      selectedReactionType.current === 'BUBBLE' &&
      selectedReactionId === id
    ) {
      deleteBubble({ bubbleId: id, comments: post.comments.temporaryVoices }) // toggle off
      return
    }
    selectedReactionType.current = 'BUBBLE'
    setSelectedReactionId(id)
  }

  return (
    <Popup title=''>
      <Post
        post={post}
        onEmojiClick={onEmojiClick}
        onVoiceClick={onVoiceClick}
        onBubbleClick={onBubbleClick}
        selectedReactionUrl={selectedReaction?.url}
      />
      <ReactedProfileList key={selectedReaction?.url} {...selectedReaction} />
      <ReactBar
        iconSize={44}
        customCss={reactBarStyle}
        comments={post?.comments}
      />
    </Popup>
  )
}

const reactBarStyle = (theme: Theme) =>
  css({
    zIndex: 20,
    position: 'fixed',
    bottom: withSafeAreaBottom(24),
    right: '0%',
    marginRight: `calc(calc(calc(100vw - min(${theme.maxWidth}, 100vw)) / 2) + 24px)`,

    padding: '10px 16px',

    display: 'flex',
    gap: '16px',

    backgroundColor: theme.colors.white,
    borderRadius: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  })
