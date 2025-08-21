import { css, useTheme, type Theme } from '@emotion/react'
import {
  ConfettiMinimalistic,
  FaceScanCircle,
  GalleryAdd,
  HandShake,
  MedalStarCircle,
  Notebook,
  PieChart2,
  QuestionCircle,
  StickerSmileCircle,
} from '@solar-icons/react'
import { Link } from 'react-router-dom'

import Border from '@/components/common/Border'
import { ROUTES } from '@/routes/ROUTES'
import { flexGap } from '@/styles/common'
import type { INotification, NotificationType } from '@/types/notification'
import { formatTimeAgo } from '@/utils/date'

export default function NotificationItem({
  type,
  isRead,
  title,
  createdAt,
  content,
  postId,
  actorId,
}: INotification) {
  const theme = useTheme()
  const myId = 1

  const { url, Icon } = getUrlAndIcon(type, postId, actorId, myId)

  return (
    <>
      <Link to={url} css={containerStyle(isRead)}>
        <div css={iconWrapperStyle}>
          <Icon weight='Bold' color={theme.stone[500]} size={22} />
        </div>
        <div css={[{ width: '100%' }, flexGap(10)]}>
          <div css={infoRowStyle}>
            <span>{title}</span>
            <span>{formatTimeAgo(createdAt)}</span>
          </div>
          <p css={{ fontColor: theme.stone[900] }}>{content}</p>
        </div>
      </Link>
      <Border height={1} color={theme.stone[150]} />
    </>
  )
}

const containerStyle = (isRead: boolean) =>
  css({
    boxSizing: 'border-box',
    width: '100%',
    padding: '16px 20px',

    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    opacity: isRead ? 0.5 : 1,
  })

const iconWrapperStyle = (theme: Theme) =>
  css({
    width: '40px',
    height: '40px',
    padding: '8px',

    borderRadius: '50%',
    border: `1px solid ${theme.stone[400]}`,
  })

const infoRowStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.stone[700],
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '-0.2px',
  })

function getUrlAndIcon(
  type: NotificationType,
  postId: number | null,
  actorId: number | null,
  myId: number,
) {
  let url, Icon
  if (type === 'ACHIEVE') {
    url = ROUTES.GUEST_BOOK(myId)
    Icon = MedalStarCircle
  } else if (type === 'REACTION') {
    url = ROUTES.POST_DETAIL(postId as number)
    Icon = StickerSmileCircle
  } else if (type === 'POST') {
    url = ROUTES.POST_DETAIL(postId as number)
    Icon = GalleryAdd
  } else if (type === 'GUESTBOOK') {
    url = ROUTES.GUEST_BOOK(myId)
    Icon = Notebook
  } else if (type === 'MBTI') {
    url = ROUTES.GUEST_BOOK(myId)
    Icon = PieChart2
  } else if (type === 'NEWIMAGE') {
    url = ROUTES.GUEST_BOOK(myId)
    Icon = FaceScanCircle
  } else if (type === 'BIRTHDAY') {
    url = ROUTES.GUEST_BOOK(actorId as number)
    Icon = ConfettiMinimalistic
  } else if (type === 'ASSOCIATE') {
    url = ROUTES.GUEST_BOOK(actorId as number)
    Icon = HandShake
  } else {
    url = ROUTES.NOTIFICATION_LIST
    Icon = QuestionCircle
  }

  return { url, Icon }
}
