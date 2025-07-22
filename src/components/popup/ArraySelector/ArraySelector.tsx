import type { IArrayInput, IArrayItem } from '@/types'
import { useMemo, useState } from 'react'

interface Props {
  items: IArrayItem[]
  onSelect?: (_selectedItems: IArrayInput) => void
}

export default function ArraySelector({ items, onSelect }: Props) {
  const [selectedItems, setSelectedItems] = useState<IArrayItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [items, searchTerm])

  return (
    <div>
      <input
        type='text'
        placeholder='검색...'
        onChange={e => {
          setSearchTerm(e.target.value)
        }}
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            <label>
              <input
                type='checkbox'
                value={item.id}
                onChange={e => {
                  const isChecked = e.target.checked
                  setSelectedItems(prev =>
                    isChecked
                      ? [...prev, item]
                      : prev.filter(m => m.id !== item.id),
                  )
                }}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          onSelect?.({
            items: selectedItems,
            toString: () => selectedItems.map(m => m.label).join(', '),
          })
        }
      >
        선택 완료
      </button>
    </div>
  )
}
