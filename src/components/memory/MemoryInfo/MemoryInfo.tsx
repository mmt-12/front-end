import { css, type Theme } from '@emotion/react'
import MemberImageCountChips from '../MemberImageCountChips/MemberImageCountChips'

interface Props {
  title: string
  location: string
  memberCount: number
  imageCount: number
  startDate?: string
  endDate?: string
}

export default function MemoryInfo(props: Props) {
  return (
    <div css={infoStyle}>
      <div css={titleRowStyle}>
        <h2>{props.title}</h2>
        <MemberImageCountChips
          memberCount={props.memberCount}
          imageCount={props.imageCount}
        />
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
