import { useState } from 'react'
import { css, type Theme } from '@emotion/react'
import { MagniferZoomIn } from '@solar-icons/react'

import { usePost } from '@/api'
import Profile from '@/components/common/Profile'
import { PostSkeleton } from '@/components/memory/Post'
import PostContent from '@/components/memory/PostContent/PostContent'
import ReactBar from '@/components/memory/ReactBar/ReactBar'
import EmojiList from '@/components/reaction/EmojiList'
import VoiceList from '@/components/reaction/VoiceList'
import useHeader from '@/hooks/useHeader'

export default function PostDetailPage() {
  useHeader({
    rightItem: {
      icon: null,
    },
  })

  const memoryId = 1
  const postId = 1

  const { data: post } = usePost(1, memoryId, postId)

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
        showAmount
      />
      <VoiceList
        reactions={post.comments.voices}
        onClick={handleReactionClick}
        selectedId={selectedReactionId}
        showAmount
      />
      {selectedReaction && (
        <>
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
        </>
      )}
      <ReactBar />
    </div>
  )
}

const containerStyle = css({
  padding: '0px 0px 40px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const reactionNameStyle = (theme: Theme) => ({
  padding: '12px 28px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: theme.stone[500],
})

const reactedProfilesStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '8px 16px',
})
