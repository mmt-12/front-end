import { css, type Interpolation, type Theme } from '@emotion/react'

import { rotation } from '@/styles/animation'

interface Props {
  customCss?: Interpolation<Theme>
}

export default function Loader({ customCss }: Props) {
  return (
    <div css={[loaderWrapperStyle, customCss]}>
      <div css={loaderStyle}></div>
    </div>
  )
}

const loaderWrapperStyle = css({
  padding: 4,
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
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
