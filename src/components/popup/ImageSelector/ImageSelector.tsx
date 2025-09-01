import { useState } from 'react'
import { css, useTheme } from '@emotion/react'

import { useProfileImageList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import Img from '@/components/common/Img'
import ProfileImageList from '@/components/common/ProfileImageList'
import WavyBox from '@/components/guest-book/WavyBox'

interface Props {
  value?: string
  onSelect: (_value: string) => void
}

export default function ImageSelector({ value, onSelect }: Props) {
  const theme = useTheme()
  const [image, setImage] = useState<string>(value || '')
  const userId = 1
  const { data } = useProfileImageList(1, userId)
  return (
    <>
      <div css={imageWrapperStyle}>
        <WavyBox
          strokeColor={theme.stone[600]}
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <Img src={image} alt='current profile' css={imageStyle} />
        </WavyBox>
      </div>
      {data && (
        <ProfileImageList
          images={data.profileImages}
          onImageClick={profileImage => setImage(profileImage.url)}
          selectedImageUrl={image}
        />
      )}
      <BottomButton label='이미지 수정' onClick={() => onSelect(image)} />
    </>
  )
}

const imageWrapperStyle = css({
  width: 'fit-content',
  margin: 'auto',
  padding: '32px 0',
})

const imageStyle = css({
  width: '200px',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
})
