import type { IMember } from './IMember'

interface IBaseInput {
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

export interface IMemberArrayInput extends IBaseInput {
  members: IMember[]
}
