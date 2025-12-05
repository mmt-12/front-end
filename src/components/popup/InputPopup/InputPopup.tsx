import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import type { Icon } from '@solar-icons/react/lib/types'

import { useModal } from '@/hooks/useModal'
import { inputContainerStyle } from '@/styles/input'
import Popup from '../Popup'

interface Props<T> {
  label: string
  value?: T
  onChange: (_value: T) => void
  icon: Icon
  content: React.ReactNode
  render: (_value?: T) => React.ReactNode
}

export default function InputPopup<T>({
  label,
  value,
  onChange,
  content,
  icon,
  render,
}: Props<T>) {
  const { openModal } = useModal()

  const Icon = icon as Icon
  const theme = useTheme()

  const modal = <Popup title={label}>{content}</Popup>

  return (
    <div css={inputContainerStyle}>
      <label css={labelStyle}>{label}</label>

      <button
        onClick={async () => {
          const value = await openModal(modal)
          onChange(value as T)
        }}
        css={buttonStyle}
      >
        <div>{render(value)}</div>
        {<Icon weight='Bold' size={24} color={theme.colors.stone[400]} />}
      </button>
    </div>
  )
}

const labelStyle = (theme: Theme) =>
  css({
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    color: theme.colors.stone[600],
    transition: 'color 0.1s ease-in-out',

    '&:has(+ input:focus)': {
      color: theme.colors.sky[500],
    },
  })

const buttonStyle = (theme: Theme) =>
  css({
    padding: '14px 12px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: theme.colors.stone[700],
    fontSize: '15px',
    border: 'none',
    borderRadius: '12px',
    outline: `2px solid ${theme.colors.stone[400]}`,
    backgroundColor: theme.colors.white,
    cursor: 'pointer',
    transition:
      'outline 100ms ease-in-out, transform 120ms ease, background-color 160ms ease',
    '&:hover': {
      outline: `2px solid ${theme.colors.sky[400]}`,
    },
  })
