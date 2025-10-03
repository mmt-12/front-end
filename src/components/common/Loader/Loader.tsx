import { css, type Interpolation, type Theme } from '@emotion/react'

import { rotation } from '@/styles/animation'

interface Props {
  customCss?: Interpolation<Theme>
  size?: 'sm' | 'md' | 'full'
}

export default function Loader({ customCss, size = 'sm' }: Props) {
  return (
    <div
      css={[loaderWrapperStyle(size), customCss]}
      onClick={e => e.stopPropagation()}
    >
      <div css={loaderStyle}></div>
    </div>
  )
}

const loaderWrapperStyle = (size: 'sm' | 'md' | 'full') =>
  css({
    position: size === 'full' ? 'fixed' : 'relative',
    top: size === 'full' ? 0 : 'auto',
    left: size === 'full' ? 0 : 'auto',
    right: size === 'full' ? 0 : 'auto',
    bottom: size === 'full' ? 0 : 'auto',

    width: size === 'full' ? '100vw' : '100%',
    height: size === 'full' ? '100vh' : size === 'md' ? 120 : 48,
    padding: 4,

    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: size === 'full' ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
    zIndex: size === 'full' ? 100000 : 'auto',
  })

const loaderStyle = (theme: Theme) =>
  css({
    display: 'block',
    width: 36,
    height: 36,

    flexShrink: 0,
    border: `3.5px solid ${theme.colors.sky[400]}`,
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    boxSizing: 'border-box',
    animation: `${rotation} 0.6s linear infinite`,
  })
