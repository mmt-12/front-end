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
  onTemporaryVoiceClick?: (
    _e: React.MouseEvent,
    _temporaryVoiceId: number,
  ) => void
  selectedReactionId?: number
  link?: boolean
}

export default function Post({
  post,
  onEmojiClick,
  onVoiceClick,
  onTemporaryVoiceClick = () => {},
  selectedReactionId,
  link = false,
}: Props) {
  return (
    <div css={[flexGap(10), { marginBottom: '32px' }]}>
      <div>
        <Border />
        <PostContent {...post} link={link} />
      </div>
      <EmojiList
        reactions={post.comments.emojis}
        onClick={onEmojiClick}
        selectedId={selectedReactionId}
      />
      <VoiceList
        reactions={post.comments.voices}
        onClick={onVoiceClick}
        selectedId={selectedReactionId}
      />
      <VoiceList
        reactions={post.comments.temporaryVoices}
        onClick={onTemporaryVoiceClick}
        selectedId={selectedReactionId}
      />
    </div>
  )
}
