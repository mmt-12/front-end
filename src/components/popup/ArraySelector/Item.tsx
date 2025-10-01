import { css, useTheme } from '@emotion/react'
import { AddCircle, CheckCircle } from '@solar-icons/react'

import type { IArrayItem } from '@/types'

interface Props {
  item: IArrayItem
  isSelected: boolean
  onSelect: (_item: IArrayItem) => void
}
export default function Item({ item, isSelected, onSelect }: Props) {
  const theme = useTheme()
  return (
    <li key={item.id}>
      <label css={itemStyle} onClick={() => onSelect(item)}>
        {item.render()}
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
