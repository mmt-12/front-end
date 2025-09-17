import { useMemo, useState, type JSX } from 'react'
import { css } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import SearchBar from '@/components/common/SearchBar'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'
import type { IArrayItem } from '@/types'
import { filterByStringProp } from '@/utils/filter'
import Item from './Item'

interface Props {
  items: IArrayItem[]
  initialItems?: IArrayItem[]
  searchBarIcon: JSX.ElementType
  renderPreview?: boolean
  multiple?: boolean
}

export default function ArraySelector({
  items,
  initialItems = [],
  searchBarIcon,
  multiple = false,
  renderPreview = false,
}: Props) {
  const { closeModal } = useModal()
  const [selectedItems, setSelectedItems] = useState<IArrayItem[]>(initialItems)
  const [searchTerm, setSearchTerm] = useState('')
  const searchedItems = useMemo(
    () => filterByStringProp(items, 'label', searchTerm),
    [items, searchTerm],
  )

  return (
    <>
      <SearchBar
        onChange={setSearchTerm}
        icon={searchBarIcon}
        count={items.length}
      />
      <ul css={[flexGap(16), listStyle]}>
        {searchedItems.map(item => (
          <ArraySelector.Item
            key={item.id}
            item={item}
            isSelected={selectedItems.some(m => m.id === item.id)}
            onSelect={item => {
              if (selectedItems.some(m => m.id === item.id))
                setSelectedItems(prev => prev.filter(m => m.id !== item.id))
              else if (multiple) {
                setSelectedItems(prev => [...prev, item])
              } else {
                setSelectedItems([item])
              }
            }}
          />
        ))}
      </ul>
      <BottomButton
        type='secondary'
        label='선택 완료'
        onClick={() => {
          const returnItems = {
            items: selectedItems,
            render: () => (
              <>
                {renderPreview ? (
                  selectedItems.map(m => m.render())
                ) : (
                  <span>{selectedItems.map(m => m.label).join(', ')}</span>
                )}
              </>
            ),
          }
          console.log('closing modal with', returnItems)
          closeModal(returnItems)
        }}
      />
    </>
  )
}

ArraySelector.Item = Item

const listStyle = css({
  padding: 16,
  margin: 0,
  listStyle: 'none',
})
