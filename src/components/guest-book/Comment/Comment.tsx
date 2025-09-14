import { css, type Theme } from '@emotion/react'

import type { GuestBook } from '@/api'
import Img from '@/components/common/Img'
import Voice from '@/components/reaction/Voice'
import { formatDateString } from '@/utils/date'

interface Props extends GuestBook {}

export default function Comment({ id, type, content, createdAt, name }: Props) {
  return (
    <div css={containerStyle}>
      {type === 'TEXT' && <span css={contentStyle}>{content}</span>}
      {type === 'EMOJI' && (
        <div css={imageWrapperStyle}>
          <Img src={content} alt='Emoji' customCss={imageStyle} />
        </div>
      )}
      {type === 'VOICE' && <Voice id={id} url={content} name={name} />}
      <span css={timeStyle}>{formatDateString(createdAt)}</span>
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    fontFamily: 'Pretendard Variable',
    backgroundColor: theme.colors.stone[50],
    borderRadius: 4,
    gap: 10,
  })

const contentStyle = (theme: Theme) =>
  css({
    fontSize: '14px',
    color: theme.colors.stone[800],
  })

const timeStyle = (theme: Theme) =>
  css({
    fontSize: '12px',
    color: theme.colors.stone[600],
  })

const imageWrapperStyle = css({
  width: '96px',
  height: '96px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: '6px',
  overflow: 'hidden',
})

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})
