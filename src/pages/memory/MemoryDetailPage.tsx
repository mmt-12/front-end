import { PenNewSquare } from '@solar-icons/react'
import { useLocation, useNavigate } from 'react-router-dom'

import { usePostList } from '@/api'
import MemoryInfo from '@/components/memory/MemoryInfo'
import Post from '@/components/memory/Post'
import useHeader from '@/hooks/useHeader'
import { ROUTES } from '@/routes/ROUTES'
import type { IMemoryInfo } from '@/types/memory'

export default function MemoryDetailPage() {
  const navigate = useNavigate()
  const memory = useLocation().state.memory as IMemoryInfo

  useHeader({
    routeName: memory.title,
    rightItem: {
      icon: PenNewSquare,
      onClick: () => {
        navigate(ROUTES.POST_REGISTER, { state: { memory: memory } })
      },
    },
  })

  const { data } = usePostList(1, memory.id)

  return (
    <>
      <header css={{ padding: '16px 12px' }}>
        <MemoryInfo {...memory} saveEnabled />
      </header>
      <ol>
        {data?.posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </ol>
    </>
  )
}
