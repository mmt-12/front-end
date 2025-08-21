import type { SerializedStyles, Theme } from '@emotion/react'

interface Props {
  children: React.ReactNode
  withPadding?: boolean
  customCss?: SerializedStyles | ((_theme: Theme) => SerializedStyles)
}

export default function Text({ children, withPadding, customCss }: Props) {
  return (
    <p css={[{ padding: withPadding ? '8px 16px' : '0' }, customCss]}>
      {children}
    </p>
  )
}
