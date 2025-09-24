import type { GuestBookCommentType } from './common'
import type { locationType } from './memory'
import type { NotificationType } from './notification'

// types/api.ts
export interface TokenInfo {
  grantType: string
  accessToken: string
  accessTokenExpiresAt: number
  refreshToken: string | null
  refreshTokenExpiresAt: number | null
}

export interface LoginResponse {
  memberId?: number
  name?: string
  kakaoId?: number
  email?: string
  token: TokenInfo
}

export interface SignUpRequest {
  name: string
  email: string
  birthday: string
}

export interface UpdateMemberRequest {
  name: string
  email: string
}

export interface Community {
  id: number
  name: string
  associateId: number
}

export interface CommunitiesResponse {
  communities: Community[]
}

export interface Memory {
  id: number
  title: string
  description: string
  period: {
    startTime: string
    endTime: string
  }
  location: locationType
  memberAmount: number
  pictureAmount: number
  pictures: string[]
}

export interface CreateMemoryRequest {
  title: string
  period: {
    startTime: Date
    endTime: Date
  }
  description: string
  associates: number[]
  location: locationType
}

export interface MemoryListResponse {
  nextCursor: number
  hasNext: boolean
  memories: Memory[]
}

export interface MemoryImagesResponse {
  pictures: string[]
}

export interface Achievement {
  id: number
  name: string
  criteria?: string
  type?: 'OPEN' | 'RESTRICTED' | 'HIDDEN'
  obtained?: boolean
}

export interface Author {
  id: number
  imageUrl: string
  nickname: string
  achievement?: Achievement
}

export interface CommentAuthor extends Author {
  commentId: number
  createdAt: string
}

export interface Comment {
  id: number
  name: string
  url: string
  authors: CommentAuthor[]
  involved: boolean
}

export type BubbleComment = Omit<Comment, 'name' | 'involved'>

export interface Post {
  id: number
  author: Author
  pictures: string[]
  content: string
  createdAt: string
  comments: {
    emojis: Comment[]
    voices: Comment[]
    temporaryVoices: BubbleComment[]
  }
}

export interface PostListResponse {
  posts: Post[]
  nextCursor: number
  hasNext: boolean
}

export interface CreatePostRequest {
  content: string
}

export interface UpdatePostRequest {
  content: string
  oldPictures: number[]
}

export interface Associate {
  id: number
  nickname: string
  imageUrl: string
  introduction: string
  achievement: Achievement
  birthday: string
}

export interface AssociateListResponse {
  communityName: string
  associates: Associate[]
  nextCursor: number
  hasNext: boolean
}

export interface UpdateAssociateRequest {
  profileImageUrl?: string
  nickname: string
  achievement?: number
  introduction?: string
}

export interface AchievementListResponse {
  achievements: Achievement[]
}

export interface GuestBook {
  id: number
  type: GuestBookCommentType
  content: string
  createdAt: string
  name: string
}

export interface GuestBookListResponse {
  guestBooks: GuestBook[]
  nextCursor: number
  hasNext: boolean
}

export interface CreateGuestBookRequest {
  type: GuestBookCommentType
  contentId?: number
  content?: string
}

export interface MbtiTestResponse {
  INFP: number
  INFJ: number
  INTP: number
  INTJ: number
  ISFP: number
  ISFJ: number
  ISTP: number
  ISTJ: number
  ENFP: number
  ENFJ: number
  ENTP: number
  ENTJ: number
  ESFP: number
  ESFJ: number
  ESTP: number
  ESTJ: number
}

export interface CreateMbtiTestRequest {
  mbti: string
}

export interface ProfileImage {
  id: number
  url: string
  register: boolean
}

export interface ProfileImageListResponse {
  profileImages: ProfileImage[]
  nextCursor: number
  hasNext: boolean
}

export interface Reaction {
  id: number
  name: string
  url: string
  involved: boolean
  author: {
    id: number
    nickname: string
    imageUrl: string | null
  }
}

export interface VoiceListResponse {
  voices: Reaction[]
  hasNext: boolean
  nextCursor: number
}

export interface CreateVoiceRequest {
  name: string
}


export interface EmojiListResponse {
  emojis: Reaction[]
  hasNext: boolean
  nextCursor: number
}

export interface CreateEmojiRequest {
  name: string
}

export interface Notification {
  id: number
  title: string
  content: string
  isRead: boolean
  type: NotificationType
  actorId: number
  memoryId: number
  postId: number
  createdAt: string
}

export interface NotificationListResponse {
  notifications: Notification[]
  hasNext: boolean
  nextCursor: number
}

export interface UnreadNotificationResponse {
  hasUnread: boolean
  count: number
}
