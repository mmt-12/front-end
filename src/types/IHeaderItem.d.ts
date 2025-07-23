import type { Icon } from '@solar-icons/react/lib/types'

export interface IHeaderItem {
  icon: Icon | null
  onClick: () => void
}
