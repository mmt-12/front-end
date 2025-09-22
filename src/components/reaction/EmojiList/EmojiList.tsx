import { css } from '@emotion/react'

import Emoji from '@/components/reaction/Emoji'
import type { IReaction, ReactionListProps } from '@/types/reaction'

interface Props extends ReactionListProps {
  reactions: Array<IReaction>
}

export default function EmojiList(props: Props) {
  if (props.reactions.length === 0) return null
  return (
    <div css={reactionsStyle} className='no-scrollbar'>
      {props.reactions.map(emoji => (
        <Emoji
          key={emoji.id}
          {...emoji}
          onClick={e => props.onClick(e, emoji.id)}
          isActive={emoji.url == props.selectedUrl}
        />
      ))}
    </div>
  )
}

const reactionsStyle = css({
  padding: '4px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  overflowX: 'auto',
})
