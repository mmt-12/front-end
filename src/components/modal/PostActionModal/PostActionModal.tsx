import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

import { useDeletePost } from '@/api'
import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import BottomModal from '../BottomModal'

interface Props {
  memoryId: number
  postId: number
}

export default function PostActionModal({ memoryId, postId }: Props) {
  const communityId = useUserStore(s => s.communityId)
  const { confirm, closeModal } = useModal()
  const { mutate: deletePost } = useDeletePost(communityId, memoryId)

  const handleDeletePost = async () => {
    await closeModal()
    if (!(await confirm('포스트를 삭제하시겠어요?'))) return

    deletePost(postId)
  }

  return (
    <BottomModal>
      <div css={contentWrapperStyle}>
        <Link to={ROUTES.POST_EDIT(memoryId, postId)}>
          <Button label='포스트 수정' />
        </Link>
        <Button
          type='secondary'
          label='포스트 삭제'
          onClick={handleDeletePost}
        />
      </div>
    </BottomModal>
  )
}

const contentWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px',
  gap: '12px',
  a: {
    width: '100%',
  },
})
