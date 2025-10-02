import {
  ConfettiMinimalistic,
  FaceScanCircle,
  GalleryAdd,
  HandShake,
  MedalStarCircle,
  Notebook,
  PieChart2,
  QuestionCircle,
  StickerSmileCircle,
} from '@solar-icons/react'

import { ROUTES } from "@/routes/ROUTES"
import type { NotificationType } from "@/types/notification"

export function notificationToUrl (type: string, memoryId?: number | null, postId?: number | null, actorId?: number | null) {
  let url
  if (type === 'ACHIEVE') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'REACTION' && memoryId && postId) {
    url = ROUTES.POST_DETAIL(memoryId, postId)
  } else if (type === 'POST' && memoryId && postId) {
    url = ROUTES.POST_DETAIL(memoryId, postId)
  } else if (type === 'GUESTBOOK') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'MBTI') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'NEWIMAGE') {
    url = ROUTES.GUEST_BOOK()
  } else if (type === 'BIRTHDAY' && actorId) {
    url = ROUTES.GUEST_BOOK(actorId)
  } else if (type === 'ASSOCIATE' && actorId) {
    url = ROUTES.GUEST_BOOK(actorId)
  } else {
    url = ROUTES.NOTIFICATION_LIST
  }

  return url
}

export function notificationToIcon (
  type: NotificationType,
  memoryId?: number | null,
  postId?: number | null,
  actorId?: number | null,
) {
  let Icon
  if (type === 'ACHIEVE') {
    Icon = MedalStarCircle
  } else if (type === 'REACTION' && memoryId && postId) {
    Icon = StickerSmileCircle
  } else if (type === 'POST' && memoryId && postId) {
    Icon = GalleryAdd
  } else if (type === 'GUESTBOOK') {
    Icon = Notebook
  } else if (type === 'MBTI') {
    Icon = PieChart2
  } else if (type === 'NEWIMAGE') {
    Icon = FaceScanCircle
  } else if (type === 'BIRTHDAY' && actorId) {
    Icon = ConfettiMinimalistic
  } else if (type === 'ASSOCIATE' && actorId) {
    Icon = HandShake
  } else {
    Icon = QuestionCircle
  }

  return Icon
}
