import { css } from '@emotion/react'

export interface Props {
  children?: React.ReactNode
}

export default function ReactionList(props: Props) {
  return (
    <div css={reactionsStyle} className='no-scrollbar'>
      {props.children}
    </div>
  )
}

const reactionsStyle = css({
  padding: '4px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
  overflowX: 'auto',
})
