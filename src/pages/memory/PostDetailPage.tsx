import { useState } from 'react'
import { css, type Theme } from '@emotion/react'
import { MagniferZoomIn } from '@solar-icons/react'
import { useParams } from 'react-router-dom'

import { usePost } from '@/api'
import Profile from '@/components/common/Profile'
import { PostSkeleton } from '@/components/memory/Post'
import PostContent from '@/components/memory/PostContent/PostContent'
import ReactBar from '@/components/memory/ReactBar/ReactBar'
import EmojiList from '@/components/reaction/EmojiList'
import VoiceList from '@/components/reaction/VoiceList'
import useHeader from '@/hooks/useHeader'
import { useUserStore } from '@/store/userStore'

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

  if (!post)
    return (
      <div css={containerStyle}>
        <PostSkeleton />
      </div>
    )

  const selectedReaction =
    post.comments.emojis.find(emoji => emoji.id === selectedReactionId) ||
    post.comments.voices.find(voice => voice.id === selectedReactionId)

  const handleReactionClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setSelectedReactionId(id)
  }

  return (
    <div css={containerStyle}>
      <PostContent {...post} />
      <EmojiList
        reactions={post.comments.emojis}
        onClick={handleReactionClick}
        selectedId={selectedReactionId}
      />
      <VoiceList
        reactions={post.comments.voices}
        onClick={handleReactionClick}
        selectedId={selectedReactionId}
      />
      {selectedReaction && (
        <div css={reactionDetailStyle}>
          <div css={reactionNameStyle}>
            <p>:{selectedReaction.name}:</p>
            <MagniferZoomIn weight='Linear' size={20} />
          </div>
          <div css={reactedProfilesStyle}>
            {selectedReaction.authors.map(author => (
              <Profile
                key={author.id}
                {...author}
                size='sm'
                introduction={undefined}
              />
            ))}
          </div>
        </div>
      )}
      <ReactBar iconSize={44} customCss={reactBarStyle} />
    </div>
  )
}

const containerStyle = css({
  padding: '0px 0px 40px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

const reactionDetailStyle = css({
  padding: 12,

  display: 'flex',
  flexDirection: 'column',
  gap: 20,
})

const reactionNameStyle = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.stone[500],
})

const reactedProfilesStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

const reactBarStyle = (theme: Theme) =>
  css({
    zIndex: 20,
    position: 'fixed',
    bottom: '24px',
    right: '0%',
    marginRight: `calc(calc(calc(100vw - min(${theme.maxWidth}, 100vw)) / 2) + 24px)`,

    padding: '10px 16px',

    display: 'flex',
    gap: '24px',

    backgroundColor: theme.white,
    borderRadius: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  })
