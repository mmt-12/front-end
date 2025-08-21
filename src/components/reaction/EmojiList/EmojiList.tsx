import { css } from '@emotion/react'

import Emoji from '@/components/reaction/Emoji'
import type { IReaction, ReactionListProps } from '@/types/reaction'

interface Props extends ReactionListProps {
  reactions: Array<IReaction>
}

export default function EmojiList(props: Props) {
  return (
    <div css={reactionsStyle(props.showAmount)} className='no-scrollbar'>
      {props.reactions.map(emoji => (
        <Emoji
          key={emoji.id}
          {...emoji}
          onClick={e => props.onClick(e, emoji.id)}
          isActive={emoji.id === props.selectedId}
          amount={props.showAmount ? emoji.amount : undefined}
        />
      ))}
    </div>
  )
}

const reactionsStyle = (showAmount: boolean | undefined) =>
  css({
    padding: '4px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: showAmount ? '8px' : '16px',
    overflowX: 'auto',
  })
