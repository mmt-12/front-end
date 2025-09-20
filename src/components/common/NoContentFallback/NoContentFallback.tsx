import { css, useTheme, type Theme } from '@emotion/react'
import { Link } from 'react-router-dom'

import noContentImage from '@/assets/images/mascot/no-image.png'
import Button from '@/components/common/Button'
import Img from '@/components/common/Img'

interface NoContentFallbackAction {
  label: string
  to?: string
  onClick?: () => void
}

interface NoContentFallbackProps {
  message: string
  size?: 'full' | 'block'
  image?: boolean
  action?: NoContentFallbackAction
}

export default function NoContentFallback({
  message,
  size = 'block',
  image = false,
  action,
}: NoContentFallbackProps) {
  const theme = useTheme()

  const actionNode = action
    ? action.to
      ? (
          <Link to={action.to} css={actionWrapperStyle}>
            <Button label={action.label} size='md' onClick={action.onClick} />
          </Link>
        )
      : (
          <div css={actionWrapperStyle}>
            <Button label={action.label} size='md' onClick={action.onClick} />
          </div>
        )
    : null

  return (
    <div css={containerStyle(size, theme)}>
      {image && (
        <Img
          src={noContentImage}
          alt='no content'
          width={size === 'full' ? 200 : 160}
          height={size === 'full' ? 200 : 160}
          customCss={imageStyle(size)}
        />
      )}
      <p css={messageStyle(size, theme)}>{message}</p>
      {actionNode}
    </div>
  )
}

const containerStyle = (size: 'full' | 'block', theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: size === 'full' ? 24 : 16,
    padding: size === 'full' ? '64px 24px' : '32px 16px',
    minHeight: size === 'full' ? 'calc(100vh - 160px)' : 'auto',
    margin: '0 auto',
    color: theme.colors.stone[500],
  })

const imageStyle = (size: 'full' | 'block') =>
  css({
    borderRadius: 16,
    objectFit: 'contain',
    width: size === 'full' ? 200 : 160,
    height: size === 'full' ? 200 : 160,
  })

const messageStyle = (size: 'full' | 'block', theme: Theme) =>
  css({
    fontSize: size === 'full' ? 16 : 14,
    lineHeight: 1.5,
    whiteSpace: 'pre-line',
    color: theme.colors.stone[500],
  })

const actionWrapperStyle = css({
  width: '100%',
  maxWidth: 320,
  display: 'block',
  textDecoration: 'none',
})
