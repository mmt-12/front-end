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
