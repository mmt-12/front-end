import type { ChangeEvent } from 'react'
import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'

import { inputContainerStyle } from '@/styles/input'

interface Props {
  value: string
  onChange: (
    _value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  type?: 'input' | 'textarea'
  label?: string
}

export default function InputField({
  value,
  onChange,
  onKeyDown,
  type = 'input',
  label,
}: Props) {
  const inputProps = {
    css: inputStyle,
    value,
    onChange,
  }

  return (
    <div css={inputContainerStyle}>
      {label && <label css={labelStyle}>{label}</label>}
      {type === 'textarea' ? (
        <textarea rows={3} {...inputProps} onKeyDown={onKeyDown} />
      ) : (
        <input type='text' {...inputProps} onKeyDown={onKeyDown} />
      )}
    </div>
  )
}

const labelStyle = (theme: Theme) =>
  css({
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    color: theme.stone[600],
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
