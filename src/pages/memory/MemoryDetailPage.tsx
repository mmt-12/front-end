import MemoryInfo from '@/components/memory/MemoryInfo'
import Post from '@/components/memory/Post'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
import { POST } from '@/mocks/data/post'
import { css } from '@emotion/react'

const MEMORY = MEMORIES[0]
export default function MemoryDetailPage() {
  useHeader({
    routeName: MEMORY.title,
  })
  return (
    <div className='no-scrollbar'>
      <header css={headerStyle}>
        <MemoryInfo {...MEMORY} saveEnabled />
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
  padding: '16px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})
