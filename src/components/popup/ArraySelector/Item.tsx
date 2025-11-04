import type { ReactNode } from 'react'
import { css, useTheme } from '@emotion/react'
import { AddCircle, CheckCircle } from '@solar-icons/react'

interface Props<T> {
  item: T
  isSelected: boolean
  onSelect: (_item: T) => void
  render: (_item: T) => ReactNode
}
export default function Item<T>({
  item,
  isSelected,
  onSelect,
  render,
}: Props<T>) {
  const theme = useTheme()
  return (
    <li>
      <label css={itemStyle} onClick={() => onSelect(item)}>
        {render(item)}
        {isSelected ? (
          <CheckCircle
            weight='Bold'
            size={40}
            color={theme.colors.sky[500]}
            css={buttonStyle}
          />
        ) : (
          <AddCircle
            weight='Bold'
            size={40}
            color={theme.colors.stone[300]}
            css={buttonStyle}
          />
        )}
      </label>
    </li>
  )
}

const itemStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const buttonStyle = css({
  flexShrink: 0,
})
