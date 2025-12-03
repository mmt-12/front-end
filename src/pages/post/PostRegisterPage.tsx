import { useState } from 'react'
import type { AxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreatePost } from '@/api'
import { useMemoryDetail } from '@/api/memory'
import Loader from '@/components/common/Loader'
import PostRegisterView from '@/components/post/PostRegisterView'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
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
  const { alert } = useModal()

  const memoryId = Number(useParams().memoryId)

  const { data: memory } = useMemoryDetail(communityId, memoryId)
  const { mutate: registerPost, isPending } = useCreatePost(
    communityId,
    memoryId,
  )

  const [images, setImages] = useState<(File | string)[]>([])
  const [description, setDescription] = useState<string>('')

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
    console.log(
      'size: ',
      formData
        .getAll('pictures')
        .reduce((acc, file) => acc + (file as File).size, 0),
      'bytes',
    )
    registerPost(formData, {
      onSuccess: async () => {
        setTimeout(() => {
          alert('포스트가 등록되었습니다.')
        }, 400)
        navigate(-1)
      },
      onError: err => {
        if ((err as AxiosError).status === 413) {
          alert('용량이 너무 커요. 용량을 줄여 다시 시도해주세요.')
        }
      },
    })
  }

  return (
    <>
      {isPending && <Loader size='full' />}
      <PostRegisterView
        action='REGISTER'
        memory={memory}
        images={images}
        setImages={setImages}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
