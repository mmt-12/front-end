import Chip from '@/components/common/Chip'
import MemoryInfo from '@/components/memory/MemoryInfo'
import Post from '@/components/memory/Post'
import { MEMBERS } from '@/mocks/data/members'
import { MEMORIES } from '@/mocks/data/memories'
import { css } from '@emotion/react'
import { DownloadSquare } from '@solar-icons/react'

const MEMORY = MEMORIES[0]
export default function MemoryDetailPage() {
  return (
    <div className='no-scrollbar'>
      <header css={headerStyle}>
        <MemoryInfo {...MEMORY} />
        <div css={descriptionRowStyle}>
          <div>
            <p>우리가 함께 마신 소주와 수영장 물을 기억하며</p>
          </div>
          <Chip
            Icon={DownloadSquare}
            label='사진 모두 저장'
            onClick={() => console.log('save all')}
            customCss={chipCustomStyle}
          />
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

const descriptionRowStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const chipCustomStyle = css({
  padding: '6px 12px',
})
