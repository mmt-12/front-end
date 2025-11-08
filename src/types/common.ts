import type { Interpolation } from '@emotion/react'
import type { Icon } from '@solar-icons/react/lib/types'

import type { Achievement } from './api'
import type { Theme } from '@emotion/react'

export interface IHeaderItem {
  icon: Icon | string | null
  onClick?: () => void
}

export interface IDateRangeInput {
  startTime: Date
  endTime: Date
}

export interface ILocationInput {
  address: string
  location: {
    latitude: number
    longitude: number
  }
}


export interface IMember {
  id: number
  nickname: string
  imageUrl?: string
  achievement?: Achievement
  introduction?: string
}

export interface ButtonProps {
  label: string
  icon?: React.ReactNode
  type?: 'primary' | 'secondary' | 'disabled'
  size?: 'sm' | 'md' | 'lg' | 'full'
  onClick?: () => void
  customCss?: Interpolation<Theme>
}

export type DayCellType = 'default' | 'inRange' | 'dot'

export type GuestBookCommentType = 'TEXT' | 'EMOJI' | 'VOICE'

export interface IProfileImage {
  id: number
  url: string
  register: boolean
}