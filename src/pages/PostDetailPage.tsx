import Emoji from '@/components/common/Emoji'
import Profile from '@/components/common/Profile'
import Voice from '@/components/common/Voice'
import PostContent from '@/components/memory/PostContent/PostContent'
import ReactBar from '@/components/memory/ReactBar/ReactBar'
import ReactionList from '@/components/memory/ReactionList'
import useHeader from '@/hooks/useHeader'
import { MEMBERS } from '@/mocks/data/members'
import { emojies, voices } from '@/mocks/data/reaction'
import { css, type Theme } from '@emotion/react'
import { MagniferZoomIn } from '@solar-icons/react'

export default function PostDetailPage() {
  useHeader({
    rightItem: {
      icon: null,
    },
  })
  const postContent = {
    id: '1',
    images: [
      '/test_images/image1.png',
      '/test_images/image2.png',
      '/test_images/image3.png',
    ],
    content: '첫 번째 포스트 내용입니다.',
    author: MEMBERS[4],
    createdAt: new Date('2025-06-20T12:00:00'),
  }

  const handleReactionClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    console.log(`Reaction clicked: ${id}`)
  }

  const selectedReaction = {
    id: '1',
    name: 'like',
    url: '/test_images/image1.png',
    amount: 15,
    iReacted: true,
    isActive: true,
  }

  return (
    <div css={containerStyle}>
      <PostContent {...postContent} />
      <div css={reactionsStyle}>
        <ReactionList>
          {emojies.map(emoji => (
            <Emoji key={emoji.id} {...emoji} onClick={handleReactionClick} />
          ))}
        </ReactionList>
        <ReactionList>
          {voices.map(voice => (
            <Voice key={voice.id} {...voice} onClick={handleReactionClick} />
          ))}
        </ReactionList>
      </div>
      <div css={reactionNameStyle}>
        <p>:{selectedReaction.name}:</p>
        <MagniferZoomIn weight='Linear' size={20} />
      </div>
      <div css={reactedProfilesStyle}>
        <Profile {...MEMBERS[0]} size='sm' description={undefined} />
        <Profile {...MEMBERS[1]} size='sm' description={undefined} />
        <Profile {...MEMBERS[2]} size='sm' description={undefined} />
      </div>
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
