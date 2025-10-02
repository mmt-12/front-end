import { css } from '@emotion/react'

import NotificationItem from '@/components/notification/NotificationItem'
import type { INotification } from '@/types/notification'

export default function NotificationModal({
  title,
  content,
  actorId,
  postId,
  memoryId,
  type,
}: Omit<INotification, 'id' | 'isRead' | 'createdAt'>) {
  return (
    <div css={wrapperStyle}>
      <NotificationItem
        title={title}
        content={content}
        actorId={actorId}
        postId={postId}
        memoryId={memoryId}
        type={type}
        isRead={false}
        createdAt={new Date().toISOString()}
        id={0}
        isModal
      />
    </div>
  )
}

const wrapperStyle = css({
  scale: 0.9,
  position: 'fixed',
  width: '100%',
  height: '100vh',
  top: 32,
})
