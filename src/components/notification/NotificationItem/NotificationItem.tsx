import { css, useTheme, type Interpolation, type Theme } from '@emotion/react'
import { Link } from 'react-router-dom'

import Border from '@/components/common/Border'
import { flexGap } from '@/styles/common'
import type { INotification } from '@/types/notification'
import { formatTimeAgo } from '@/utils/date'
import { notificationToIcon, notificationToUrl } from '@/utils/notification'

interface Props extends INotification {
  isModal?: boolean
  customCss?: Interpolation<Theme>
}

export default function NotificationItem({
  type,
  isRead,
  title,
  createdAt,
  content,
  memoryId,
  postId,
  actorId,
  isModal = false,
  customCss,
}: Props) {
  const theme = useTheme()

  const url = notificationToUrl(type, memoryId, postId, actorId)
  const Icon = notificationToIcon(type, memoryId, postId, actorId)
  const state = memoryId ? { memory: { id: memoryId } } : undefined

  return (
    <>
      <Link
        to={url}
        css={[containerStyle(isRead, theme), customCss]}
        state={state}
      >
        <div css={iconWrapperStyle}>
          <Icon weight='Bold' color={theme.colors.stone[500]} size={22} />
        </div>
        <div css={[{ width: '100%' }, flexGap(10)]}>
          <div css={infoRowStyle}>
            <span>{title}</span>
            <span>{formatTimeAgo(new Date(createdAt))}</span>
          </div>
          <p css={{ fontColor: theme.colors.stone[900] }}>{content}</p>
        </div>
      </Link>
      {!isModal && <Border height={1} color={theme.colors.stone[150]} />}
    </>
  )
}

const containerStyle = (isRead: boolean, theme: Theme) =>
  css({
    boxSizing: 'border-box',
    width: '100%',
    padding: '16px 20px',

    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    opacity: isRead ? 0.5 : 1,
    backgroundColor: theme.colors.white,
  })

const iconWrapperStyle = (theme: Theme) =>
  css({
    width: '40px',
    height: '40px',
    padding: '8px',

    borderRadius: '50%',
    border: `1px solid ${theme.colors.stone[400]}`,
  })

const infoRowStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.colors.stone[700],
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '-0.2px',
  })
