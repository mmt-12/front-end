import { useState } from 'react'
import { css, useTheme } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import ImageGrid from '@/components/common/ImageGrid'
import Img from '@/components/common/Img'
import WavyBox from '@/components/guest-book/WavyBox'
import { PROFILE_IMAGES } from '@/mocks/data/profileImages'

interface Props {
  value?: string
  onSelect: (_value: string) => void
}

const images = PROFILE_IMAGES

export default function ImageSelector({ value, onSelect }: Props) {
  const theme = useTheme()
  const [imagePath, setImagePath] = useState<string>(value || '')
  return (
    <>
      <div css={imageWrapperStyle}>
        <WavyBox
          strokeColor={theme.stone[600]}
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <Img src={imagePath} alt='current profile' css={imageStyle} />
        </WavyBox>
      </div>
      <ImageGrid
        images={images}
        onImageClick={setImagePath}
        selectedImage={imagePath}
      />
      <BottomButton label='이미지 수정' onClick={() => onSelect(imagePath)} />
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
