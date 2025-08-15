import { useState } from 'react'
import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import type { IDateRangeInput } from '@/types'

interface Props<T = string | IDateRangeInput> {
  onChange: (_value: T) => void
  size?: 'md' | 'lg'
  label?: string
}

export default function InputField<T>({
  label,
  onChange,
  size = 'md',
}: Props<T>) {
  const [value, setValue] = useState<T>('' as T)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value as T
    setValue(newValue)
    onChange(newValue)
  }
  return (
    <div css={containerStyle}>
      {label && <label css={labelStyle}>{label}</label>}
      {size === 'lg' ? (
        <textarea
          css={inputStyle}
          rows={3}
          value={value as string}
          onChange={handleChange}
        />
      ) : (
        <input
          css={inputStyle}
          type='text'
          value={value as string}
          onChange={handleChange}
        />
      )}
    </div>
  )
}

const containerStyle = css({
  margin: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

const labelStyle = (theme: Theme) =>
  css({
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    color: theme.stone[700],
    transition: 'color 0.1s ease-in-out',

    '&:has(+ input:focus), &:has(+ textarea:focus)': {
      color: theme.sky[500],
    },
  })

const inputStyle = (theme: Theme) =>
  css({
    margin: '0px',
    padding: '14px 12px',

    border: 'none',
    borderRadius: '12px',
    outline: `2px solid ${theme.stone[400]}`,

    color: theme.black,
    fontFamily: 'inherit',
    fontSize: '16px',
    fontWeight: '400',
    letterSpacing: '0.5px',

    transition: 'outline 0.1s ease-in-out',

    '&:focus': {
      outline: `2px solid ${theme.sky[400]}`,
    },
  })
