import { css, keyframes, type Theme } from '@emotion/react'

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
    <div css={[containerBaseStyle, animationStyle]}>
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
        customCss={css({
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 24,
          position: 'relative',
        })}
      />
    </div>
  )
}

const containerBaseStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    top: -160,
    width: 'calc(100% - 24px)',
    maxWidth: `calc(${theme.maxWidth} - 48px)`,
    padding: '0px 18px 16px 18px',
    margin: '24px 12px',
    zIndex: 151,

    borderRadius: '24px',
  })

const slideDown = keyframes({
  from: { transform: 'translateY(0)' },
  to: { transform: 'translateY(160px)' },
})

const animationStyle = css({
  animation: `${slideDown} 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
  willChange: 'transform',
})
