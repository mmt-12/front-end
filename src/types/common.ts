import type { ReactNode } from 'react'
import type { SerializedStyles } from '@emotion/react'
import type { Icon } from '@solar-icons/react/lib/types'

export interface IHeaderItem {
  icon: Icon | null
  onClick?: () => void
}
export interface IBaseInput {
  render: () => ReactNode
}

export interface IDateRangeInput extends IBaseInput {
  startDate: string
  endDate: string
}

export interface ITextInput extends IBaseInput {
  value: string
}

export interface ILocationInput extends IBaseInput {
  address: string
  location: {
    lat: number
    lng: number
  }
}

export interface IArrayItem extends IBaseInput {
  id: number
  label: string
  selected?: boolean
}

export interface IArrayInput extends IBaseInput {
  items: IArrayItem[]
}

export interface IMember {
  id: number
  name: string
  imageUrl?: string
  badgeId?: number
  description?: string
}

export interface ButtonProps {
  label: string
  icon?: React.ReactNode
  type?: 'primary' | 'secondary' | 'disabled'
  size?: 'sm' | 'md' | 'lg' | 'full'
  onClick?: () => void
  customCss?: SerializedStyles
}

export type DayCellType = 'default' | 'inRange' | 'dot'
