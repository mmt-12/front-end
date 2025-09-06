import { css, type Theme } from '@emotion/react'

import { formatDateString } from '@/utils/date'

interface Props {
  content: string
  createdAt: string
}

export default function Comment({ content, createdAt }: Props) {
  return (
    <div css={containerStyle}>
      <span css={contentStyle}>{content}</span>
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
    backgroundColor: theme.stone[50],
    borderRadius: 4,
  })

const contentStyle = (theme: Theme) =>
  css({
    fontSize: '14px',
    color: theme.stone[800],
  })

const timeStyle = (theme: Theme) =>
  css({
    fontSize: '12px',
    color: theme.stone[600],
  })
