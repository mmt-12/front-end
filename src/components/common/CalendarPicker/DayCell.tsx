import { css, useTheme, type Theme } from '@emotion/react'

import { flexGap } from '@/styles/common'
import type { DayCellType } from '@/types'

interface Props {
  date: Date
  type: DayCellType
  onClick: (_date: Date) => void
  colIdx: number
  isSelected?: boolean
}

export default function DayCell({
  date,
  type,
  onClick,
  colIdx,
  isSelected = false,
}: Props) {
  const theme = useTheme()
  return (
    <td onClick={() => onClick(date)} style={{ position: 'relative' }}>
      <div
        css={[dayContainerStyle(theme, date, isSelected, colIdx), flexGap(6)]}
      >
        <span>{date ? date.getDate() : ''}</span>
        {type === 'dot' && <div css={dotStyle(theme, isSelected)}></div>}
      </div>
      <div css={dayWrapperStyle(theme, type)}></div>
    </td>
  )
}

const dayContainerStyle = (
  theme: Theme,
  date: Date | null,
  isSelected: boolean,
  colIdx: number,
) =>
  css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: '1/1',
    minWidth: 32,
    maxWidth: 52,
    margin: 'auto',
    padding: '6px',
    background: date && isSelected ? theme.colors.sky[300] : undefined,
    color:
      date && isSelected
        ? theme.colors.white
        : colIdx === 0
          ? theme.colors.red
          : colIdx === 6
            ? theme.colors.blue
            : theme.colors.black,
    fontWeight: 'bold',
    borderRadius: 14,
    textAlign: 'center',
    zIndex: 10,
    transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
  })

const dayWrapperStyle = (theme: Theme, type: DayCellType) =>
  css({
    position: 'absolute',
    width: '190%',
    height: '80%',
    transform: 'translateY(-110%) translateX(-30%)',
    backgroundColor:
      type === 'inRange' ? theme.colors.stone[200] : 'transparent',
    zIndex: 1,
  })

const dotStyle = (theme: Theme, isSelected: boolean) =>
  css({
    borderRadius: '50%',
    width: '6px',
    height: '6px',
    backgroundColor: isSelected ? theme.colors.white : theme.colors.sky[500],
  })
