import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import BottomButton from '@/components/common/BottomButton'
import ImageInputField from '@/components/common/ImageInputField/ImageInputField'
import InputField from '@/components/common/InputField'
import useHeader from '@/hooks/useHeader'

export default function PostRegisterPage() {
  useHeader({
    routeName: '포스트',
    rightItem: {
      icon: null,
    },
  })

  const location = useLocation()
  const memory = location.state.memory

  const [images, setImages] = useState<File[]>([])
  const [description, setDescription] = useState<string>('')

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div css={{ display: 'flex', alignItems: 'end', padding: '16px 20px' }}>
        <h1 css={{ display: 'inline-block', fontSize: '24px' }}>
          {memory.title}
        </h1>
        <p css={{ fontSize: 16 }}>에서 있었던 일을 공유해요.</p>
      </div>
      <ImageInputField
        maxLength={30}
        images={images}
        onChange={is => setImages(is)}
      />
      <InputField
        label='어떤 상황이었나요?'
        type='textarea'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <BottomButton
        label='작성 완료'
        onClick={() => {
          console.log(description)
        }}
      />
    </div>
  )
}
