import { css } from '@emotion/react'

import Img from '@/components/common/Img'
import { fadeIn } from '@/styles/animation'

interface Props {
  url: string
}

export default function EmojiDetailModal({ url }: Props) {
  return (
    <div css={wrapperStyle}>
      <Img src={url} alt='Emoji Detail' customCss={imageStyle} />
    </div>
  )
}

const wrapperStyle = css({
  position: 'fixed',
  inset: 0,

  animation: `${fadeIn} 160ms ease-in`,
  willChange: 'transform, opacity',
})

const imageStyle = css({
  position: 'fixed',
  width: '90vw',
  height: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '12px',
})
