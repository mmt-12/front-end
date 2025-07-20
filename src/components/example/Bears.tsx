import { css } from '@emotion/react'
import { useBearStore } from '@/store/bearStore'

const hoverColor = 'blue'
const backgroundColor = 'lightgray'

export default function Bears() {
  const bears = useBearStore(state => state.bears)

  return (
    <div
      css={css`
        padding: 32px;
        background-color: ${backgroundColor};
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          background-color: ${hoverColor};
          color: white;
        }
      `}
    >
      {bears}
    </div>
  )
}
