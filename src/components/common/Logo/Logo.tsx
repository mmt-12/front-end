import { css, type Theme } from '@emotion/react'

export default function Logo({ subtitle = true }: { subtitle?: boolean }) {
  return (
    <div css={containerStyle}>
      {subtitle && <p css={subTitleStyle}>우리의 추억을 위한 공간</p>}
      <p css={titleStyle}>Memento</p>
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 16px 16px 16px',
})

const titleStyle = (theme: Theme) =>
  css({
    fontSize: '48px',
    color: theme.colors.stone[700],
    margin: '0',
    fontFamily: 'Pacifico, cursive',
  })

const subTitleStyle = css({ fontSize: 18, padding: 0, margin: 0 })
