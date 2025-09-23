import { css } from '@emotion/react'

import Img from '@/components/common/Img'

interface Props {
  url: string
}

export default function EmojiDetailModal({ url }: Props) {
  return <Img src={url} alt='Emoji Detail' customCss={imageStyle} />
}

const imageStyle = css({
  position: 'fixed',
  width: '90vw',
  height: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '12px',
})
