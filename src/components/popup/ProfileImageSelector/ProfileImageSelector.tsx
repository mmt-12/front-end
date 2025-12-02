import { useState } from 'react'
import { css, useTheme } from '@emotion/react'

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
  return (
    <>
      <div css={imageWrapperStyle}>
        <WavyBox
          strokeColor={theme.colors.stone[600]}
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <Img src={image} alt='current profile' customCss={imageStyle} />
        </WavyBox>
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
