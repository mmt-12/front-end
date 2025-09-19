import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreatePost } from '@/api'
import { useMemoryDetail } from '@/api/memory'
import BottomButton from '@/components/common/BottomButton'
import ImageInputField from '@/components/common/ImageInputField/ImageInputField'
import InputField from '@/components/common/InputField'
import { Skeleton } from '@/components/common/Skeleton'
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
  const { alert } = useModal()

  const memoryId = Number(useParams().memoryId)

  const { data: memory } = useMemoryDetail(communityId, memoryId)
  const { mutate: registerPost } = useCreatePost(communityId, memoryId)

  const [images, setImages] = useState<File[]>([])
  const [description, setDescription] = useState<string>('')

  const handleSubmit = () => {
    if (images.length === 0) return alert('사진을 최소 1장 이상 등록해주세요.')
    if (description.trim() === '') return alert('설명을 입력해주세요.')

    const formData = new FormData()
    images.forEach(image => formData.append('pictures', image))
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
    <div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div css={{ display: 'flex', alignItems: 'end', padding: '16px 20px' }}>
        {memory ? (
          <h1 css={{ display: 'inline-block', fontSize: '24px' }}>
            {memory.title}
          </h1>
        ) : (
          <Skeleton width={80} height={28} />
        )}
        <p css={{ fontSize: 16 }}>에서 있었던 일을 공유해요.</p>
      </div>
      <ImageInputField
        maxLength={10}
        images={images}
        onChange={is => setImages(is)}
      />
      <InputField
        label='어떤 상황이었나요?'
        type='textarea'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <BottomButton label='작성 완료' onClick={handleSubmit} />
    </div>
  )
}
