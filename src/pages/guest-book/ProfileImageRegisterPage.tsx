import { useState } from 'react'

import { useProfileImageList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import ImageInputField from '@/components/common/ImageInputField'
import ProfileImageList from '@/components/common/ProfileImageList'
import useHeader from '@/hooks/useHeader'
import { flexGap } from '@/styles/common'

export default function ProfileImageRegisterPage() {
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  const userId = 1
  const { data } = useProfileImageList(1, userId)

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
      {data && (
        <ProfileImageList
          images={data.profileImages}
          onImageClick={handleImageClick}
        />
      )}
      <BottomButton label='등록' onClick={handleSubmit} />
    </div>
  )
}
