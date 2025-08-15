import Profile from '@/components/common/Profile'
import EmojiList from '@/components/reaction/EmojiList'
import PostContent from '@/components/memory/PostContent/PostContent'
import ReactBar from '@/components/memory/ReactBar/ReactBar'
import VoiceList from '@/components/reaction/VoiceList'
import useHeader from '@/hooks/useHeader'
import { MEMBERS } from '@/mocks/data/members'
import { emojies, voices } from '@/mocks/data/reaction'
import { css, type Theme } from '@emotion/react'
import { MagniferZoomIn } from '@solar-icons/react'
import { useState } from 'react'

export default function PostDetailPage() {
  useHeader({
    rightItem: {
      icon: null,
    },
  })

  const initialSelectedId =
    emojies.length > 0 ? emojies[0].id : voices.length > 0 ? voices[0].id : 0

  const [selectedReactionId, setSelectedReactionId] =
    useState<number>(initialSelectedId)

  const postContent = {
    id: 1,
    images: [
      '/test_images/image1.png',
      '/test_images/image2.png',
      '/test_images/image3.png',
    ],
    content: '첫 번째 포스트 내용입니다.',
    author: MEMBERS[4],
    createdAt: new Date('2025-06-20T12:00:00'),
  }

  const selectedReaction =
    emojies.find(emoji => emoji.id === selectedReactionId) ||
    voices.find(voice => voice.id === selectedReactionId)

  const handleReactionClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setSelectedReactionId(id)
  }

  return (
    <div css={containerStyle}>
      <PostContent {...postContent} />
      <div css={reactionsStyle}>
        <EmojiList
          reactions={emojies}
          onClick={handleReactionClick}
          selectedId={selectedReactionId}
        />
        <VoiceList
          reactions={voices}
          onClick={handleReactionClick}
          selectedId={selectedReactionId}
        />
      </div>
      {selectedReaction && (
        <>
          <div css={reactionNameStyle}>
            <p>:{selectedReaction.name}:</p>
            <MagniferZoomIn weight='Linear' size={20} />
          </div>
          <div css={reactedProfilesStyle}>
            <Profile {...MEMBERS[0]} size='sm' description={undefined} />
            <Profile {...MEMBERS[1]} size='sm' description={undefined} />
            <Profile {...MEMBERS[2]} size='sm' description={undefined} />
          </div>
        </>
      )}
      <ReactBar />
    </div>
  )
}

const containerStyle = css({
  padding: '10px 0px 40px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

const reactionsStyle = css({
  padding: '16px 0px',

  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
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
