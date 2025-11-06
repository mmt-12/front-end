import { useMemo, useState, type JSX, type ReactNode } from 'react'
import { css } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import SearchBar from '@/components/common/SearchBar'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'
import { filterByStringProp } from '@/utils/filter'
import Item from './Item'

interface Props<T> {
  items: (T & Searchable)[]
  initialItems?: (T & Searchable)[]
  searchBarIcon: JSX.ElementType
  multiple?: boolean
  renderItem: (_item: T) => ReactNode
}

export type Searchable = {
  label: string
}

export default function ArraySelector<T>({
  items,
  initialItems = [],
  searchBarIcon,
  multiple = false,
  renderItem,
}: Props<T>) {
  const { closeModal } = useModal()
  const [selectedItems, setSelectedItems] =
    useState<(T & Searchable)[]>(initialItems)
  const [searchTerm, setSearchTerm] = useState('')
  const searchedItems = useMemo<(T & Searchable)[]>(
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
        {searchedItems.map((item, index) => (
          <Item
            key={index}
            item={item}
            isSelected={selectedItems.some(i => i.label === item.label)}
            render={renderItem}
            onSelect={item => {
              if (selectedItems.some(i => i == item))
                setSelectedItems(prev =>
                  prev.filter(i => i.label != item.label),
                )
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
          closeModal(selectedItems)
        }}
      />
    </>
  )
}

const listStyle = css({
  padding: 16,
  margin: 0,
  listStyle: 'none',
})
