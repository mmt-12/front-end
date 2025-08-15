import { CelebrationContext } from '@/contexts/CelebrationProvider'
import { css, type Theme } from '@emotion/react'
import { useContext } from 'react'
import Button from '@/components/common/Button'

export default function Celebration() {
  const { config, isOpen, close } = useContext(CelebrationContext)
  if (!isOpen) return null
  return (
    <div css={backgroundStyle} onClick={close.fn}>
      <div css={containerStyle}>
        <h2>{config.title}</h2>
        <h2>{config.message}</h2>
        <h2>Celebration!</h2>
        <Button label='닫기' onClick={close.fn} />
      </div>
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '32px',
    color: theme.stone[900],
    backgroundColor: theme.bg,
  })

const backgroundStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  zIndex: 11,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
})
