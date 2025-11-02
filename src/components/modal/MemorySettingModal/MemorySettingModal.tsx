import { css, type Theme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/Button'
import { ROUTES } from '@/routes/ROUTES'
import BottomModal from '../BottomModal'

interface Props {
  memoryId: string | number
}

export default function MemorySettingModal(props: Props) {
  const navigate = useNavigate()
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
