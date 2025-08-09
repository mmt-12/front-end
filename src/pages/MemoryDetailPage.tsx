import MemberImageCountChips from '@/components/memory/MemberImageCountChips'
import Post from '@/components/memory/Post'
import { MEMBERS } from '@/mocks/data/members'
import { css, useTheme, type Theme } from '@emotion/react'
import { DownloadSquare } from '@solar-icons/react'

export default function MemoryDetailPage() {
  const theme = useTheme()
  return (
    <div className='no-scrollbar'>
      <header css={headerStyle}>
        <div css={titleRowStyle}>
          <div className='left-info'>
            <h1>양평 엠티</h1>
            <div css={metaStyle}>
              <p>경기도 양평시 양평군</p>
              <p>2025.06.20 - 2025.06.21</p>
            </div>
          </div>
          <div className='right-info'>
            <MemberImageCountChips memberCount={5} imageCount={10} />
            <button css={chipStyle}>
              <DownloadSquare
                weight='Bold'
                color={theme.stone[700]}
                size={20}
              />
              사진 모두 저장
            </button>
          </div>
        </div>
        <div>
          <p>우리가 함께 마신 소주와 수영장 물을 기억하며</p>
        </div>
      </header>
      <ol>
        <li>
          <Post
            id={'1'}
            images={[
              '/test_images/image1.png',
              '/test_images/image2.png',
              '/test_images/image3.png',
            ]}
            content='첫 번째 포스트 내용입니다.'
            author={MEMBERS[4]}
            createdAt={new Date('2025-06-20T12:00:00')}
          />
        </li>
        <li>
          <Post
            id={'2'}
            images={[
              '/test_images/image1.png',
              '/test_images/image1.png',
              '/test_images/image1.png',
            ]}
            content='두 번째 포스트 내용입니다.'
            author={{
              id: '2',
              name: '김철수',
              imageUrl: '/test_images/image4.png',
            }}
            createdAt={new Date('2025-06-20T12:00:00')}
          />
        </li>
      </ol>
    </div>
  )
}

const headerStyle = css({
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const titleRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
  h1: {
    fontSize: '22px',
  },
  '.left-info': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '12px',
  },
  '.right-info': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'end',
  },
})

const metaStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    p: {
      fontSize: '14px',
      color: theme.stone[700],
    },
  })

const chipStyle = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '5px 10px',
    borderRadius: '16px',
    backgroundColor: theme.stone[150],
    color: theme.stone[900],
    border: `1px solid ${theme.stone[600]}`,
  })
