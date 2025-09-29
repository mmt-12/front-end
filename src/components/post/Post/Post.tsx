import type { Post as PostType } from '@/api'
import Border from '@/components/common/Border'
import EmojiList from '@/components/reaction/EmojiList'
import VoiceList from '@/components/reaction/VoiceList'
import { flexGap } from '@/styles/common'
import PostContent from '../PostContent'

interface Props {
  post: PostType
  onEmojiClick: (_e: React.MouseEvent, _emojiId: number) => void
  onVoiceClick: (_e: React.MouseEvent, _voiceId: number) => void
  onBubbleClick?: (_e: React.MouseEvent, _temporaryVoiceId: number) => void
  selectedReactionUrl?: string
  link?: boolean
  size?: 'sm' | 'md'
}

export default function Post({
  post,
  onEmojiClick,
  onVoiceClick,
  onBubbleClick = () => {},
  selectedReactionUrl,
  link = false,
  size = 'md',
}: Props) {
  return (
    <div css={[flexGap(6), { marginBottom: '32px' }]}>
      <div>
        <Border />
        <PostContent {...post} link={link} />
      </div>
      <EmojiList
        reactions={post.comments.emojis}
        onClick={onEmojiClick}
        selectedUrl={selectedReactionUrl}
        size={size}
      />
      <VoiceList
        reactions={post.comments.voices}
        onClick={onVoiceClick}
        selectedUrl={selectedReactionUrl}
        size={size}
      />
      <VoiceList
        reactions={post.comments.temporaryVoices}
        onClick={onBubbleClick}
        selectedUrl={selectedReactionUrl}
        size={size}
      />
    </div>
  )
}
