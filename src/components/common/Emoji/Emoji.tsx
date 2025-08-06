import type { IReaction } from '@/types/reaction'

export default function Emoji({
  url: imageUrl,
  size = 'md',
  amount,
  isActive,
}: IReaction) {
  return (
    <div>
      <img
        src={imageUrl}
        alt='Emoji'
        style={{
          width: size === 'md' ? '24px' : '32px',
          height: size === 'md' ? '24px' : '32px',
          opacity: isActive ? 1 : 0.5,
          marginRight: amount ? `${amount * 4}px` : '0',
        }}
      />
      {amount != null && (
        <span style={{ fontSize: '12px', color: '#666' }}>{amount}</span>
      )}
    </div>
  )
}
