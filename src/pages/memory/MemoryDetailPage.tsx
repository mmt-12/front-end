import Chip from '@/components/common/Chip'
import MemoryInfo from '@/components/memory/MemoryInfo'
import Post from '@/components/memory/Post'
import { MEMORIES } from '@/mocks/data/memories'
import { POST } from '@/mocks/data/post'
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
          <Post {...POST} />
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
