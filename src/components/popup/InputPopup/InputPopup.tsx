import { cloneElement } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import type { Icon } from '@solar-icons/react/lib/types'

import { useModal } from '@/hooks/useModal'
import { inputContainerStyle } from '@/styles/input'
import type {
  IArrayInput,
  IBaseInput,
  IDateRangeInput,
  ILocationInput,
} from '@/types'
import PopupModal from '../PopupModal'

interface Props<T = IDateRangeInput | IArrayInput | ILocationInput> {
  label: string
  value?: T
  onChange: (_value: T) => void
  icon: Icon
  content: React.ReactNode
}

export default function InputPopup<T extends IBaseInput>({
  label,
  value,
  onChange,
  content,
  icon,
}: Props<T>) {
  const { openModal, closeModal } = useModal()

  const handlePopupSelect = (result: T): void => {
    closeModal(result)
    onChange(result)
  }

  const Icon = icon as Icon
  const theme = useTheme()

  const modal = (
    <PopupModal title={label} onClose={() => closeModal()}>
      {cloneElement(
        content as React.ReactElement<{
          onSelect: (_value: T) => void
        }>,
        {
          onSelect: handlePopupSelect,
        },
      )}
    </PopupModal>
  )

  return (
    <div css={inputContainerStyle}>
      <label css={labelStyle}>{label}</label>

      <button onClick={() => openModal(modal)} css={buttonStyle}>
        <div>{value?.render()}</div>
        {<Icon weight='Bold' size={24} color={theme.stone[400]} />}
      </button>
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

    '&:has(+ input:focus)': {
      color: theme.sky[500],
    },
  })

const buttonStyle = (theme: Theme) =>
  css({
    padding: '14px 12px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: theme.stone[700],
    fontSize: '15px',
    border: 'none',
    borderRadius: '12px',
    outline: `2px solid ${theme.stone[400]}`,
    backgroundColor: theme.white,
    cursor: 'pointer',

    transition: 'outline 0.1s ease-in-out',

    '&:hover': {
      outline: `2px solid ${theme.sky[400]}`,
    },
  })
