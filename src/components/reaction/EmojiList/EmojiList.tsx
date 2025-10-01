import Emoji from '@/components/reaction/Emoji'
import { reactionsStyle } from '@/styles/post'
import type { IReaction, ReactionListProps } from '@/types/reaction'

interface Props extends ReactionListProps {
  reactions: Array<IReaction>
}

export default function EmojiList({
  reactions,
  onClick,
  selectedUrl,
  size,
}: Props) {
  if (reactions.length === 0) return null
  return (
    <div css={reactionsStyle(size)} className='no-scrollbar'>
      {reactions.map(emoji => (
        <Emoji
          key={emoji.id}
          {...emoji}
          onClick={e => onClick(e, emoji.id)}
          isActive={emoji.url == selectedUrl}
          size={size}
          isPost
        />
      ))}
    </div>
  )
}
