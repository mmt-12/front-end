import type { IMember, IMemberArrayInput } from '@/types'
import { useState } from 'react'

interface Props {
  onSelect: (_members: IMemberArrayInput) => void
}

const MEMBERS: IMember[] = [
  {
    id: '1',
    nickname: '홍길동',
  },
  {
    id: '2',
    nickname: '김철수',
  },
  {
    id: '3',
    nickname: '이영희',
  },
  {
    id: '4',
    nickname: '박지민',
  },
]

export default function MemberSelector({ onSelect }: Props) {
  const [selectedMembers, setSelectedMembers] = useState<IMember[]>([])

  return (
    <div>
      <h2>멤버 선택</h2>
      <ul>
        {MEMBERS.map(member => (
          <li key={member.id}>
            <label>
              <input
                type='checkbox'
                value={member.id}
                onChange={e => {
                  const isChecked = e.target.checked
                  setSelectedMembers(prev =>
                    isChecked
                      ? [...prev, member]
                      : prev.filter(m => m.id !== member.id),
                  )
                }}
              />
              {member.nickname}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          onSelect({
            members: selectedMembers,
            toString: () => selectedMembers.map(m => m.nickname).join(', '),
          })
        }
      >
        선택 완료
      </button>
    </div>
  )
}
