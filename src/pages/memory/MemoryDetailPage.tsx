import Chip from '@/components/common/Chip'
import MemoryInfo from '@/components/memory/MemoryInfo'
import Post from '@/components/memory/Post'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
import { POST } from '@/mocks/data/post'
import { css } from '@emotion/react'
import { DownloadSquare } from '@solar-icons/react'

const MEMORY = MEMORIES[0]
export default function MemoryDetailPage() {
  useHeader({
    routeName: MEMORY.title,
  })
  return (
    <div className='no-scrollbar'>
      <header css={headerStyle}>
        <MemoryInfo {...MEMORY} />
        <div css={saveButtonRowStyle}>
          <Chip
            Icon={DownloadSquare}
            label='사진 모두 저장'
            onClick={() => console.log('save all')}
            customCss={chipCustomStyle}
          />
        </div>
      </header>
      <ol>
        <Post {...POST} />
        <Post {...POST} />
        <Post {...POST} />
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

const saveButtonRowStyle = css({
  padding: '3px 6px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '12px',
})

const chipCustomStyle = css({
  padding: '6px 12px',
})
