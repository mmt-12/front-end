import { useTheme, type Interpolation, type Theme } from '@emotion/react'
import { SoundwaveSquare, StickerSmileSquare } from '@solar-icons/react'

import EmojiPickerModal from '@/components/reaction/EmojiPickerModal'
import VoicePickerModal from '@/components/reaction/VoicePickerModal'
import { useModal } from '@/hooks/useModal'

interface Props {
  iconSize: number
  customCss?: Interpolation<Theme>
}

export default function ReactBar({ iconSize, customCss }: Props) {
  const theme = useTheme()
  const { openModal } = useModal()

  const handleEmojiClick = () => {
    openModal(<EmojiPickerModal />)
  }

  const handleVoiceClick = () => {
    openModal(<VoicePickerModal />)
  }

  return (
    <div css={customCss}>
      <StickerSmileSquare
        weight='Bold'
        size={iconSize}
        color={theme.yellow}
        onClick={handleEmojiClick}
      />
      <SoundwaveSquare
        weight='Bold'
        size={iconSize}
        color={theme.sky[400]}
        onClick={handleVoiceClick}
      />
    </div>
  )
}
