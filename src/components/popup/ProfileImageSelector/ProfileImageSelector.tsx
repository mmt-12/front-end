import { useState } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { TrashBinMinimalistic2 } from '@solar-icons/react'

import { useProfileImageList } from '@/api'
import defaultImageUrl from '@/assets/images/mascot/default-profile.png'
import BottomButton from '@/components/common/BottomButton'
import Img from '@/components/common/Img'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import Loader from '@/components/common/Loader'
import NoContentFallback from '@/components/common/NoContentFallback'
import WavyBox from '@/components/guest-book/WavyBox'
import ProfileImageList, {
  ProfileImageListSkeleton,
} from '@/components/member/ProfileImageList'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'

interface Props {
  associateId: number
  value?: string
  onSelect: (_value: string) => void
}

export default function ProfileImageSelector({
  associateId,
  value,
  onSelect,
}: Props) {
  const theme = useTheme()
  const [image, setImage] = useState<string>(value || defaultImageUrl)
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProfileImageList(1, associateId, { size: 9 })
  const images = data?.pages.flatMap(page => page.profileImages) || []
  const isEmpty = !isLoading && images.length === 0
  const { confirm, closeModal } = useModal()

  const removeProfileImage = async () => {
    if (await confirm('프로필 이미지를 삭제하시겠습니까?')) {
      setImage(defaultImageUrl)
    }
  }

  return (
    <div css={flexGap(8)}>
      <div css={imageWrapperStyle}>
        <WavyBox
          strokeColor={theme.colors.stone[600]}
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <Img src={image} alt='current profile' customCss={imageStyle} />
        </WavyBox>
        {image !== defaultImageUrl && (
          <div css={buttonStyle} onClick={removeProfileImage}>
            <TrashBinMinimalistic2 size={28} color='white' weight='Bold' />
          </div>
        )}
      </div>
      <InfiniteScroll
        fetchNext={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNextPage}
        loader={<Loader customCss={{ padding: 24 }} />}
        disabled={isEmpty}
      >
        {isLoading ? (
          <ProfileImageListSkeleton />
        ) : images.length > 0 ? (
          <ProfileImageList
            images={images}
            onImageClick={profileImage => setImage(profileImage.url)}
            selectedImageUrl={image}
            isMyProfile
          />
        ) : (
          <NoContentFallback
            size='block'
            message='등록된 이미지가 없어요. 멤버에게 등록을 부탁해보세요!'
          />
        )}
      </InfiniteScroll>
      <BottomButton
        label='이미지 수정'
        onClick={() => {
          onSelect(image)
          closeModal()
        }}
      />
    </div>
  )
}

const imageWrapperStyle = css({
  width: 'fit-content',
  margin: '32px auto',
  position: 'relative',
  display: 'inline-flex',
})

const imageStyle = css({
  width: '200px',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
})

const buttonStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    background: theme.colors.stone[700],
    border: 'none',
    borderRadius: '14px',
    padding: '6px 6px 4px',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
  })
