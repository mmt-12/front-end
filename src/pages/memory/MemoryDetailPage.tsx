import MemoryInfo from '@/components/memory/MemoryInfo'
import Post from '@/components/memory/Post'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
import { POST } from '@/mocks/data/post'
import { ROUTES } from '@/routes/ROUTES'
import { PenNewSquare } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

const MEMORY = MEMORIES[0]
export default function MemoryDetailPage() {
  const navigate = useNavigate()

  useHeader({
    routeName: MEMORY.title,
    rightItem: {
      icon: PenNewSquare,
      onClick: () => {
        navigate(ROUTES.POST_REGISTER, { state: { memory: MEMORY } })
      },
    },
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
