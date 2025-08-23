import { useMemo, useState, type JSX } from 'react'
import { css } from '@emotion/react'
import { AddCircle, CheckCircle } from '@solar-icons/react'

import BottomButton from '@/components/common/BottomButton'
import SearchBar from '@/components/common/SearchBar'
import { theme } from '@/styles/theme'
import type { IArrayInput, IArrayItem } from '@/types'

interface Props {
  items: IArrayItem[]
  searchBarIcon: JSX.ElementType
  renderPreview?: boolean
  multiple?: boolean
  onSelect?: (_selectedItems: IArrayInput) => void
}

export default function ArraySelector({
  items,
  searchBarIcon,
  renderPreview,
  onSelect,
  multiple,
}: Props) {
  const [selectedItems, setSelectedItems] = useState<IArrayItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const searchedItems = useMemo(() => {
    return items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [items, searchTerm])

  return (
    <>
      <SearchBar
        onChange={setSearchTerm}
        icon={searchBarIcon}
        count={items.length}
      />
      <ul css={listStyle}>
        {searchedItems.map(item => (
          <li key={item.id}>
            {selectedItems.some(m => m.id === item.id) ? (
              <label
                css={itemStyle}
                onClick={() =>
                  setSelectedItems(prev => prev.filter(m => m.id !== item.id))
                }
              >
                {item.render()}
                <CheckCircle
                  weight='Bold'
                  size={40}
                  color={theme.sky[500]}
                  onClick={() =>
                    setSelectedItems(prev => prev.filter(m => m.id !== item.id))
                  }
                  css={buttonStyle}
                />
              </label>
            ) : (
              <label
                css={itemStyle}
                onClick={() =>
                  multiple
                    ? setSelectedItems(prev => [...prev, item])
                    : setSelectedItems([item])
                }
              >
                {item.render()}
                <AddCircle
                  weight='Bold'
                  size={40}
                  color={theme.stone[300]}
                  css={buttonStyle}
                />
              </label>
            )}
          </li>
        ))}
      </ul>
      <BottomButton
        type='secondary'
        label='선택 완료'
        onClick={() =>
          onSelect?.({
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
          })
        }
      />
    </>
  )
}

const listStyle = css({
  padding: 16,
  paddingBottom: 72,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  listStyle: 'none',
})

const itemStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const buttonStyle = css({
  flexShrink: 0,
})
