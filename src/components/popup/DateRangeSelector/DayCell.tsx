import { css, useTheme, type Theme } from '@emotion/react'

interface Props {
  date: Date | null
  state: number
  onClick: () => void
  startDate: string
  endDate: string
  colIdx: number
}

export default function DayCell(props: Props) {
  const theme = useTheme()
  return (
    <td onClick={props.onClick} style={{ position: 'relative' }}>
      <div
        css={dayContainerStyle(theme, props.date, props.state, props.colIdx)}
      >
        <span>{props.date ? props.date.getDate() : ''}</span>
      </div>
      <div
        css={dayWrapperStyle(
          theme,
          props.state,
          props.startDate,
          props.endDate,
        )}
      ></div>
      <div
        css={dayWrapperStyle(
          theme,
          props.state,
          props.startDate,
          props.endDate,
        )}
      ></div>
    </td>
  )
}

const dayContainerStyle = (
  theme: Theme,
  date: Date | null,
  state: number,
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
    background: date && state >= 2 ? theme.sky[300] : undefined,
    color:
      date && state >= 2
        ? theme.white
        : colIdx === 0
        ? theme.red
        : colIdx === 6
        ? theme.blue
        : theme.black,
    fontWeight: 'bold',
    borderRadius: 14,
    textAlign: 'center',
    zIndex: 10,
    transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
  })

const dayWrapperStyle = (
  theme: Theme,
  state: number,
  startDate: string,
  endDate: string,
) => {
  let background: string | undefined = undefined

  if (state === 1) {
    background = theme.stone[200]
  }
  // else if (state === 2) {
  //   background = `linear-gradient(to right, transparent 50%, ${theme.stone[200]} 50%)`
  // } else if (state === 3) {
  //   background = `linear-gradient(to left, transparent 50%, ${theme.stone[200]} 50%)`
  // }

  if ((startDate && !endDate) || startDate == endDate) background = undefined

  return css({
    position: 'absolute',
    width: '190%',
    height: '80%',
    transform: 'translateY(-110%) translateX(-30%)',
    background: background,
    zIndex: 1,
  })
}
