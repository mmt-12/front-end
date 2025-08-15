import Voice from '@/components/reaction/Voice'
import type { IVoice, ReactionListProps } from '@/types/reaction'
import { css } from '@emotion/react'

interface Props extends ReactionListProps {
  reactions: Array<IVoice>
}

export default function VoiceList(props: Props) {
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
  gap: '18px',
  overflowX: 'auto',
})
