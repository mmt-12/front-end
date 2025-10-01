import Voice from '@/components/reaction/Voice'
import { reactionsStyle } from '@/styles/post'
import type { ReactionListProps } from '@/types/reaction'

export default function VoiceList(props: ReactionListProps) {
  if (props.reactions.length === 0) return null
  return (
    <div css={reactionsStyle(props.size)} className='no-scrollbar'>
      {props.reactions.map(voice => (
        <Voice
          key={voice.id}
          {...voice}
          onClick={e => props.onClick(e, voice.id)}
          isActive={voice.url === props.selectedUrl}
          isPost
          size={props.size}
        />
      ))}
    </div>
  )
}
