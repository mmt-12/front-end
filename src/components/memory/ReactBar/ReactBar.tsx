import { useTheme, type Interpolation, type Theme } from '@emotion/react'
import { SoundwaveSquare, StickerSmileSquare } from '@solar-icons/react'

import bubble from '@/assets/images/icons/bubble.png'
import Img from '@/components/common/Img'
import BubbleInputModal from '@/components/reaction/BubbleInputModal'
import EmojiPickerModal from '@/components/reaction/EmojiPickerModal'
import VoicePickerModal from '@/components/reaction/VoicePickerModal'
import { useModal } from '@/hooks/useModal'
import { slideDown } from '@/styles/animation'

interface Props {
  iconSize: number
  customCss?: Interpolation<Theme>
}

export default function ReactBar({ iconSize, customCss }: Props) {
  const theme = useTheme()
  const { openModal } = useModal()

  const handleBubbleClick = () => {
    openModal(<BubbleInputModal />, slideDown)
  }

  const handleEmojiClick = () => {
    openModal(<EmojiPickerModal />, slideDown)
  }

  const handleVoiceClick = () => {
    openModal(<VoicePickerModal />, slideDown)
  }

  return (
    <div css={customCss}>
      <Img
        className='button'
        src={bubble}
        alt='bubble icon'
        width={iconSize}
        height={iconSize}
        onClick={handleBubbleClick}
      />
      <StickerSmileSquare
        className='button'
        weight='Bold'
        size={iconSize}
        color={theme.colors.yellow}
        onClick={handleEmojiClick}
      />
      <SoundwaveSquare
        className='button'
        weight='Bold'
        size={iconSize}
        color={theme.colors.sky[400]}
        onClick={handleVoiceClick}
      />
    </div>
  )
}
