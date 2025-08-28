import { useState, type JSX } from 'react'
import { css, type Theme } from '@emotion/react'

import Chip from '@/components/common/Chip'
import InputField from '@/components/common/InputField'
import { flexGap } from '@/styles/common'

interface Props {
  onChange: (_value: string) => void
  icon: JSX.ElementType
  count: number
}

export default function SearchBar({ onChange, icon, count }: Props) {
  const [value, setValue] = useState('')
  return (
    <div css={[flexGap(12, 'row'), searchBarWrapperStyle]}>
      <div css={inputWrapperStyle}>
        <InputField
          onChange={e => {
            onChange(e.target.value)
            setValue(e.target.value)
          }}
          value={value}
        />
      </div>
      <Chip
        customCss={css({ backgroundColor: 'transparent' })}
        Icon={icon}
        label={count}
      />
    </div>
  )
}

const searchBarWrapperStyle = css({
  margin: '14px 16px',
})

const inputWrapperStyle = (theme: Theme) =>
  css({
    flexGrow: 1,
    '> div': {
      margin: '0 !important',
      width: '100%',
    },
    input: {
      padding: '10px 12px !important',
      outline: `1.5px solid ${theme.stone[300]}`,
    },
  })
