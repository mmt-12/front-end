import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useCreateProfileImage, useProfileImageList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import ImageInputField from '@/components/common/ImageInputField'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import Loader from '@/components/common/Loader'
import ProfileImageList, {
  ProfileImageListSkeleton,
} from '@/components/member/ProfileImageList'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
import useStardust from '@/hooks/useStardust'
import { flexGap } from '@/styles/common'

export default function ProfileImageRegisterPage() {
  useStardust()
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  const { alert, setPending } = useModal()
  const { associateId } = useParams()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProfileImageList(1, Number(associateId), { size: 9 })
  const { mutate: uploadProfileImages, isPending } = useCreateProfileImage(
    1,
    Number(associateId),
  )

  setPending(isPending)

  const images = data?.pages.flatMap(page => page.profileImages) || []

  const [newImages, setNewImages] = useState<(File | string)[]>([])

  const handleImageClick = () => {}

  const handleSubmit = () => {
    if (newImages.length === 0) return

    const formData = new FormData()
    newImages.forEach(image => {
      formData.append('image', image)
    })

    uploadProfileImages(formData, {
      onSuccess: () => {
        setNewImages([])
        alert('프로필 이미지가 등록되었습니다.')
      },
    })
  }

  return (
    <div css={flexGap(12)}>
      <ImageInputField
        images={newImages}
        maxLength={1}
        onChange={setNewImages}
      />
      <InfiniteScroll
        fetchNext={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNextPage}
        loader={<Loader customCss={{ padding: 24 }} />}
      >
        {isLoading ? (
          <ProfileImageListSkeleton />
        ) : (
          <ProfileImageList images={images} onImageClick={handleImageClick} />
        )}
      </InfiniteScroll>
      <BottomButton label='등록' onClick={handleSubmit} />
    </div>
  )
}
