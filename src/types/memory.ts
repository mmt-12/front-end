export interface IMemoryInfo {
  id: number
  title: string
  location: LocationType
  memberAmount: number
  pictureAmount: number
  pictures: string[]
  description?: string
  period: {
    startTime: string
    endTime: string
  }
}

export type LocationType = {
  latitude: number
  longitude: number
  code: number
  name: string
  address: string
}
