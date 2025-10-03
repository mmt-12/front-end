import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreatePost } from '@/api'
import { useMemoryDetail } from '@/api/memory'
import PostRegisterView from '@/components/post/PostRegisterView'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function PostRegisterPage() {
  useHeader({
    routeName: '포스트',
    rightItem: {
      icon: null,
    },
  })

  const navigate = useNavigate()
  const { communityId } = useUserStore()
  const { alert, setPending } = useModal()

  const memoryId = Number(useParams().memoryId)

  const { data: memory } = useMemoryDetail(communityId, memoryId)
  const { mutate: registerPost, isPending } = useCreatePost(
    communityId,
    memoryId,
  )

  const [images, setImages] = useState<(File | string)[]>([])
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    setPending(isPending)
  }, [isPending, setPending])

  const handleSubmit = () => {
    if (images.length === 0) return alert('사진을 최소 1장 이상 등록해주세요.')
    if (description.trim() === '') return alert('설명을 입력해주세요.')

    const formData = new FormData()
    images.toReversed().forEach(image => formData.append('pictures', image))
    formData.append(
      'request',
      new Blob([JSON.stringify({ content: description })], {
        type: 'application/json',
      }),
    )
    registerPost(formData, {
      onSuccess: () => {
        navigate(ROUTES.MEMORY_DETAIL(memoryId))
        alert('포스트가 등록되었습니다.')
      },
    })
  }

  return (
    <PostRegisterView
      action='REGISTER'
      memory={memory}
      images={images}
      setImages={setImages}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
    />
  )
}
