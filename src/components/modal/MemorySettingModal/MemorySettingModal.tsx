import { css, type Theme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import { useDeleteMemory } from '@/api'
import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { added을or를 } from '@/utils/string'
import BottomModal from '../BottomModal'
import Confirm from '../Confirm'

interface Props {
  memoryId: string | number
  title: string
}

export default function MemorySettingModal(props: Props) {
  const navigate = useNavigate()
  const { openModal, alert } = useModal()
  const { mutateAsync: deleteMemory } = useDeleteMemory()

  const handleDeleteClick = async () => {
    const isConfirmed = await openModal(
      <Confirm
        affirm={{ text: '기억 이름을 입력하세요.', answer: props.title }}
      >
        정말 {added을or를(props.title, str => `'${str}'`)} 삭제하시겠습니까?
      </Confirm>,
    )
    if (isConfirmed) {
      deleteMemory(Number(props.memoryId), {
        onSuccess: () => {
          console.log('Memory deleted')
          navigate(ROUTES.MEMORY_LIST)
          alert('기억을 삭제했어요.')
        },
        onError: () => {
          alert('기억 삭제에 실패했어요. 잠시 후 다시 시도해주세요.')
        },
      })
    }
  }
  return (
    <BottomModal>
      <div css={wrapperStyle}>
        <Button
          label='수정하기'
          onClick={() => {
            navigate(ROUTES.MEMORY_EDIT(props.memoryId))
          }}
        />
        <Button
          label='삭제하기'
          customCss={(theme: Theme) =>
            css({ backgroundColor: theme.colors.danger })
          }
          onClick={handleDeleteClick}
        />
      </div>
    </BottomModal>
  )
}

const wrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})
