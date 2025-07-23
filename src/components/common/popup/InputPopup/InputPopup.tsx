import { cloneElement, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import PopupModal from '../PopupModal'
import type { IBaseInput, IDateRangeInput, ITextInput } from '@/types'
import type { Icon } from '@solar-icons/react/lib/types'

interface Props<T extends IBaseInput = ITextInput | IDateRangeInput> {
  label: string
  onChange: (_value: T) => void
  icon: Icon
  content: React.ReactNode
}

export default function InputPopup<T extends IBaseInput>({
  label,
  onChange,
  content,
  icon,
}: Props<T>) {
  const [value, setValue] = useState<T | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const handlePopupSelect = (result: T): void => {
    setShowPopup(false)
    setValue(result)
    onChange(result)
  }

  const Icon = icon as Icon

  const theme = useTheme()

  return (
    <div css={containerStyle}>
      <label css={labelStyle}>{label}</label>

      <button onClick={() => setShowPopup(true)} css={buttonStyle}>
        <span>{value?.toString()}</span>
        {<Icon weight='Bold' size={24} color={theme.stone[400]} />}
      </button>
      {showPopup && (
        <PopupModal title={label} onClose={() => setShowPopup(false)}>
          {cloneElement(
            content as React.ReactElement<{
              onSelect: (_value: T) => void
            }>,
            {
              onSelect: handlePopupSelect,
            },
          )}
        </PopupModal>
      )}
    </div>
  )
}

const containerStyle = css({
  padding: '12px 16px',
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

    '&:has(+ input:focus)': {
      color: theme.sky[500],
    },
  })

const buttonStyle = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 12px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: theme.white,
    color: theme.stone[700],
    fontSize: '14px',
    cursor: 'pointer',
    outline: `2px solid ${theme.stone[400]}`,
    transition: 'outline 0.1s ease-in-out',

    '&:hover': {
      outline: `2px solid ${theme.sky[400]}`,
    },
  })
