export interface IMemoryInfo {
  id: number
  title: string
  location: locationType
  memberCount: number
  imageCount: number
  images: string[]
  description?: string
  startDate: string
  endDate: string
}

export type locationType = {
  lat: number
  lng: number
  name: string
  address: string
}
