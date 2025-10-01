export interface IMemoryInfo {
  id: number
  title: string
  location: locationType
  memberAmount: number
  pictureAmount: number
  pictures: string[]
  description?: string
  period: {
    startTime: string
    endTime: string
  }
}

export type locationType = {
  latitude: number
  longitude: number
  code: number
  name: string
  address: string
}
