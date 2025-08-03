import { css, useTheme, type Theme } from '@emotion/react'
import { GalleryCircle, UserCircle } from '@solar-icons/react'

interface Props {
  title: string
  location: string
  memberCount: number
  imageCount: number
  startDate?: string
  endDate?: string
}

export default function MemoryInfo(props: Props) {
  const theme = useTheme()
  return (
    <div css={infoStyle}>
      <div css={titleRowStyle}>
        <h2>{props.title}</h2>
        <div css={countChipsStyle}>
          <div>
            <UserCircle weight='Bold' size={19} color={theme.stone[600]} />
            <p>{props.memberCount}</p>
          </div>
          <div>
            <GalleryCircle weight='Bold' size={19} color={theme.stone[600]} />
            <p>{props.imageCount}</p>
          </div>
        </div>
      </div>
      <div css={metaRowStyle}>
        <p className='location'>{props.location}</p>

        {!!props.startDate && (
          <p className='date'>
            {props.startDate}
            {!!props.endDate && ` - ${props.endDate}`}
          </p>
        )}
      </div>
    </div>
  )
}

const infoStyle = css({
  padding: '3px 6px',
})

const titleRowStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 0',

    h2: {
      fontSize: '20px',
      color: theme.sky[600],
    },
  })

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

const metaRowStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
    fontWeight: '400',

    'p.location': {
      color: theme.stone[800],
      fontSize: '14px',
    },
    'p.date': {
      color: theme.stone[700],
      fontSize: '14px',
    },
  })
