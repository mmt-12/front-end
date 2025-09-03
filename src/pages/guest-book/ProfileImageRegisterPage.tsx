import { useState } from 'react'

import { useProfileImageList } from '@/api'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import BottomButton from '@/components/common/BottomButton'
import ImageInputField from '@/components/common/ImageInputField'
import ProfileImageList from '@/components/common/ProfileImageList'
import useHeader from '@/hooks/useHeader'
import { flexGap } from '@/styles/common'
import useStardust from '@/hooks/useStardust'

export default function ProfileImageRegisterPage() {
  useStardust()
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  const userId = 1
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProfileImageList(1, userId)
  const images = data?.pages.flatMap(page => page.profileImages) || []

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
      {images.length > 0 && (
        <InfiniteScroll
          fetchNext={() => fetchNextPage()}
          hasNextPage={hasNextPage}
          isFetchingNext={isFetchingNextPage}
        >
          <ProfileImageList
            images={images}
            onImageClick={handleImageClick}
          />
        </InfiniteScroll>
      )}
      <BottomButton label='등록' onClick={handleSubmit} />
    </div>
  )
}
