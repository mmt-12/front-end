import MemoryInfo from '@/components/memory/MemoryInfo'
import Post from '@/components/memory/Post'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
import { POST } from '@/mocks/data/post'

const MEMORY = MEMORIES[0]
export default function MemoryDetailPage() {
  useHeader({
    routeName: MEMORY.title,
  })
  return (
    <div className='no-scrollbar'>
      <header css={{ padding: '16px 12px' }}>
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
