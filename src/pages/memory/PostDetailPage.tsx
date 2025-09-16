import { useMemo, useState } from 'react'
import { css, type Theme } from '@emotion/react'
import { useParams } from 'react-router-dom'

import { usePost } from '@/api'
import Post from '@/components/memory/Post'
import { PostListItemSkeleton } from '@/components/memory/PostListItem'
import ReactBar from '@/components/memory/ReactBar/ReactBar'
import ReactedProfileList from '@/components/reaction/ReactedProfileList/ReactedProfileList'
import useHeader from '@/hooks/useHeader'
import { useUserStore } from '@/store/userStore'
import { flexGap } from '@/styles/common'

export default function PostDetailPage() {
  const { memoryId, postId } = useParams()
  const { communityId } = useUserStore()

  useHeader({
    rightItem: {
      icon: null,
    },
  })

  const { data: post } = usePost(communityId, Number(memoryId), Number(postId))

  const initialSelectedId = post
    ? post.comments.emojis.length > 0
      ? post.comments.emojis[0].id
      : post.comments.voices.length > 0
        ? post.comments.voices[0].id
        : 0
    : 0

  const [selectedReactionId, setSelectedReactionId] =
    useState(initialSelectedId)

  const selectedReaction = useMemo(
    () =>
      post?.comments.emojis.find(emoji => emoji.id === selectedReactionId) ||
      post?.comments.voices.find(voice => voice.id === selectedReactionId) ||
      post?.comments.temporaryVoices.find(
        tempVoice => tempVoice.id === selectedReactionId,
      ),
    [post, selectedReactionId],
  )

  if (!post)
    return (
      <div css={[flexGap(10), { marginBottom: '32px' }]}>
        <PostListItemSkeleton />
      </div>
    )

  const handleReactionClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setSelectedReactionId(id)
  }

  return (
    <>
      <Post
        post={post}
        onEmojiClick={handleReactionClick}
        onVoiceClick={handleReactionClick}
        onTemporaryVoiceClick={handleReactionClick}
        selectedReactionId={selectedReactionId}
      />
      <ReactedProfileList key={selectedReactionId} {...selectedReaction} />
      <ReactBar iconSize={44} customCss={reactBarStyle} />
    </>
  )
}

const reactBarStyle = (theme: Theme) =>
  css({
    zIndex: 20,
    position: 'fixed',
    bottom: '24px',
    right: '0%',
    marginRight: `calc(calc(calc(100vw - min(${theme.maxWidth}, 100vw)) / 2) + 24px)`,

    padding: '10px 16px',

    display: 'flex',
    gap: '16px',

    backgroundColor: theme.colors.white,
    borderRadius: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  })
