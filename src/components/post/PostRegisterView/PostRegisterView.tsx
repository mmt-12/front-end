import type { Memory } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import ImageInputField from '@/components/common/ImageInputField'
import InputField from '@/components/common/InputField'
import { Skeleton } from '@/components/common/Skeleton'
import { flexGap } from '@/styles/common'

interface Props {
  action: 'REGISTER' | 'EDIT'
  memory?: Memory
  images: (File | string)[]
  setImages: (_images: (File | string)[]) => void
  description: string
  setDescription: (_description: string) => void
  handleSubmit: () => void
}

export default function PostRegisterView({
  action,
  memory,
  images,
  setImages,
  description,
  setDescription,
  handleSubmit,
}: Props) {
  return (
    <div css={flexGap(12)}>
      <div css={{ display: 'flex', alignItems: 'end', padding: '16px 20px' }}>
        {memory ? (
          <h1 css={{ display: 'inline-block', fontSize: '24px' }}>
            {memory.title}
          </h1>
        ) : (
          <Skeleton width={80} height={28} />
        )}
        <p css={{ fontSize: 16 }}>에서 있었던 일을 공유해요.</p>
      </div>
      <ImageInputField
        maxLength={20}
        images={images}
        onChange={is => setImages(is)}
      />
      <InputField
        label='어떤 상황이었나요?'
        type='textarea'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <BottomButton
        label={action === 'REGISTER' ? '작성 완료' : '수정 완료'}
        onClick={handleSubmit}
      />
    </div>
  )
}
