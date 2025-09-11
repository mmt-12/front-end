import { css } from '@emotion/react'

import Voice from '@/components/reaction/Voice'
import type { ReactionListProps } from '@/types/reaction'

export default function VoiceList(props: ReactionListProps) {
  return (
    <div css={reactionsStyle} className='no-scrollbar'>
      {props.reactions.map(voice => (
        <Voice
          key={voice.id}
          {...voice}
          onClick={e => props.onClick(e, voice.id)}
          isActive={voice.id === props.selectedId}
        />
      ))}
    </div>
  )
}

const reactionsStyle = css({
  padding: '4px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  overflowX: 'auto',
})
