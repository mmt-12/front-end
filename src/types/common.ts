import type { ReactNode } from 'react'
import type { Interpolation, Keyframes } from '@emotion/react'
import type { Icon } from '@solar-icons/react/lib/types'

import type { Achievement } from './api'
import type { Theme } from '@emotion/react'

export interface IHeaderItem {
  icon: Icon | null
  onClick?: () => void
}
export interface IBaseInput {
  render: () => ReactNode
}

export interface IDateRangeInput extends IBaseInput {
  startTime: string
  endTime: string
}

export interface ILocationInput extends IBaseInput {
  address: string
  location: {
    latitude: number
    longitude: number
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

export type Modal = {
  content: ReactNode
  promiseResolver: (_value: ModalReturnType) => void
  closingKeyframe: Keyframes
  isClosing?: boolean
}

export type ModalReturnType = void | null | IBaseInput | string | boolean | IArrayInput | ILocationInput | IDateRangeInput
