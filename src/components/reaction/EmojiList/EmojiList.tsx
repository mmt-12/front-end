import Emoji from '@/components/reaction/Emoji'
import type { IReaction, ReactionListProps } from '@/types/reaction'
import { css } from '@emotion/react'

interface Props extends ReactionListProps {
  reactions: Array<IReaction>
}

export default function EmojiList(props: Props) {
  return (
    <div css={reactionsStyle} className='no-scrollbar'>
      {props.reactions.map(emoji => (
        <Emoji
          key={emoji.id}
          {...emoji}
          onClick={e => props.onClick(e, emoji.id)}
          isActive={emoji.id === props.selectedId}
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
