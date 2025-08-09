import { css, useTheme, type Theme } from '@emotion/react'
import { GalleryCircle, UserCircle } from '@solar-icons/react'

export interface Props {
  memberCount: number
  imageCount: number
}

export default function MemberImageCountChips({
  memberCount,
  imageCount,
}: Props) {
  const theme = useTheme()
  return (
    <div css={countChipsStyle}>
      <div>
        <UserCircle weight='Bold' size={19} color={theme.stone[600]} />
        <p>{memberCount}</p>
      </div>
      <div>
        <GalleryCircle weight='Bold' size={19} color={theme.stone[600]} />
        <p>{imageCount}</p>
      </div>
    </div>
  )
}

const countChipsStyle = (theme: Theme) =>
  css({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    div: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 6px',
      borderRadius: '20px',
      backgroundColor: theme.stone[150],

      p: {
        color: theme.stone[900],
        fontSize: '13px',
      },
    },
  })
