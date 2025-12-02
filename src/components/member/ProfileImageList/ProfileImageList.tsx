import { css, useTheme } from '@emotion/react'
import { CloseCircle } from '@solar-icons/react'
import { useParams } from 'react-router-dom'

import { useDeleteProfileImage } from '@/api'
import Img from '@/components/common/Img'
import WavyBox from '@/components/guest-book/WavyBox'
import { useModal } from '@/hooks/useModal'
import { useUserStore } from '@/store/userStore'
import type { IProfileImage } from '@/types'

interface Props {
  images: IProfileImage[]
  onImageClick?: (_image: IProfileImage) => void
  selectedImageUrl?: string
  isMyProfile?: boolean
}

export default function ProfileImageList({
  images,
  onImageClick,
  selectedImageUrl,
  isMyProfile = false,
}: Props) {
  const theme = useTheme()
  const props = (isSelected: boolean) =>
    isSelected
      ? {
          strokeColor: theme.colors.sky[500],
          strokeWidth: 3,
          borderRadius: 4,
        }
      : { strokeWidth: 0, strokeColor: 'transparent' }

  const { associateId: paramAssociateId } = useParams()
  const { confirm } = useModal()
  const communityId = useUserStore(state => state.communityId)
  const storeAssociateId = useUserStore(state => state.associateId)

  const { mutate: deleteProfileImage } = useDeleteProfileImage(
    communityId,
    Number(isMyProfile ? storeAssociateId : paramAssociateId),
  )

  return (
    <div css={imagesGridStyle}>
      {images.map((image, index) => (
        <WavyBox
          key={index}
          {...props(selectedImageUrl == image.url)}
          childrenOnTop={false}
        >
          <Img
            onClick={() => onImageClick?.(image)}
            src={image.url}
            alt={`Memory image ${index + 1}`}
            customCss={imageStyle(selectedImageUrl == image.url)}
          />
          {(image.register || isMyProfile) && (
            <button
              className='transparent'
              onClick={async () => {
                if (await confirm('등록된 프로필 이미지를 삭제하시겠습니까?'))
                  deleteProfileImage(image.id)
              }}
              css={deleteButtonStyle}
            >
              <CloseCircle weight='Bold' size={34} color={theme.colors.white} />
            </button>
          )}
        </WavyBox>
      ))}
    </div>
  )
}

const imagesGridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '4px',
})

const imageStyle = (isSelected: boolean) =>
  css({
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    overflow: 'hidden',
    objectPosition: 'center',
    borderRadius: isSelected ? '4px' : 0,
  })

const deleteButtonStyle = css({
  position: 'absolute',
  padding: 4,
  top: 2,
  right: 2,
  cursor: 'pointer',
  zIndex: 12,
  filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))',
})
