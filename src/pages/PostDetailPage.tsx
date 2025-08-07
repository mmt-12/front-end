import Emoji from '@/components/common/Emoji'
import Voice from '@/components/common/Voice'
import PostContent from '@/components/memory/PostContent/PostContent'
import ReactionList from '@/components/memory/ReactionList'
import useHeader from '@/hooks/useHeader'
import { emojies, voices } from '@/mocks/data/reaction'
import { css } from '@emotion/react'

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
    author: {
      id: '1',
      name: '홍길동',
      imageUrl: '/test_images/image5.png',
    },
    createdAt: new Date('2025-06-20T12:00:00'),
  }

  const handleReactionClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    console.log(`Reaction clicked: ${id}`)
  }

  return (
    <div css={containerStyle}>
      <PostContent {...postContent} />
      <ReactionList>
        {emojies.map(emoji => (
          <Emoji
            key={emoji.id}
            id={emoji.id}
            url={emoji.url}
            amount={emoji.amount}
            iReacted={emoji.iReacted}
            isActive={emoji.isActive}
            onClick={handleReactionClick}
          />
        ))}
      </ReactionList>
      <ReactionList>
        {voices.map(voice => (
          <Voice
            key={voice.id}
            id={voice.id}
            url={voice.url}
            content={voice.content}
            amount={voice.amount}
            iReacted={voice.iReacted}
            isActive={voice.isActive}
            onClick={handleReactionClick}
          />
        ))}
      </ReactionList>
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})
