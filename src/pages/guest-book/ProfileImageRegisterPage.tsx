import { useState } from 'react'

import BottomButton from '@/components/common/BottomButton'
import ImageGrid from '@/components/common/ImageGrid'
import ImageInputField from '@/components/common/ImageInputField'
import useHeader from '@/hooks/useHeader'
import { PROFILE_IMAGES } from '@/mocks/data/profileImages'
import { flexGap } from '@/styles/common'

const images = PROFILE_IMAGES

export default function ProfileImageRegisterPage() {
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  const [newImages, setNewImages] = useState<File[]>([])

  const handleImageClick = () => {
    console.log('image clicked')
  }

  const handleSubmit = () => {
    console.log('submit clicked')
  }

  return (
    <div css={flexGap(12)}>
      <ImageInputField
        images={newImages}
        maxLength={10}
        onChange={setNewImages}
      />
      <ImageGrid images={images} onImageClick={handleImageClick} />
      <BottomButton label='등록' onClick={handleSubmit} />
    </div>
  )
}
