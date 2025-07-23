import type { Icon } from '@solar-icons/react/lib/types'

export interface IHeaderItem {
  icon: Icon | null
  onClick: () => void
}
export interface IBaseInput {
  toString: () => string
}

export interface IDateRangeInput extends IBaseInput {
  startDate: string
  endDate: string
}

export interface ITextInput extends IBaseInput {
  value: string
}

export interface ILocationInput extends IBaseInput {
  latitude: number
  longitude: number
}

export interface IArrayItem {
  id: string
  label: string
}

export interface IArrayInput extends IBaseInput {
  items: IArrayItem[]
}
