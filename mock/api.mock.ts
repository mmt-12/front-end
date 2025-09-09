import { defineMock } from 'vite-plugin-mock-dev-server'

import { ACHIEVEMENTS, GUEST_BOOK, MBTI } from './data/guestBook'
import { MEMBERS } from './data/members'
import { MEMORIES } from './data/memories'
import { NOTIFICATIONS } from './data/notifications'
import { POSTS } from './data/posts'
import { PROFILE_IMAGES } from './data/profileImages'
import { EMOJIS, VOICES } from './data/reaction'

export default defineMock([
  // Test API
  {
    url: '/api/test',
    body: {
      message: 'Hello, world!',
    },
  },
  // 기억 목록 조회
  {
    url: '/api/v1/communities/:communityId/memories',
    body: {
      memories: MEMORIES,
      nextCursor: 0,
      hasNext: true
    },
  },
  // 포스트 목록 조회
  {
    url: '/api/v1/communities/:communityId/memories/:memoryId/posts',
    body: {
      posts: POSTS,
      nextCursor: 0,
      hasNext: true
    },
  },
  // 포스트 댓글 이모지 생성
  {
    url: '/api/v1/communities/:communityId/memories/:memoryId/posts/:postId/comments/emoji',
    method: 'POST',
  },
  // 포스트 댓글 보이스 생성
  {
    url: '/api/v1/communities/:communityId/memories/:memoryId/posts/:postId/comments/voices',
    method: 'POST',
  },
  // 방명록 - Get associate profile
  {
    url: '/api/v1/communities/:communityId/associates/:associateId',
    body: {
      id: 1,
      nickname: '홍길동',
      imageUrl: '/test_images/image3.png',
      introduction: '안녕하세요, 홍길동입니다.',
      achievement: ACHIEVEMENTS[0],
      birthday: '1990-01-01',
    },
  },
  // 방명록 - Get associates list in a community
  {
    url: '/api/v1/communities/:communityId/associates',
    body: {
      communityName: '싸피12반최고',
      associates: MEMBERS,
      nextCursor: 101, hasNext: true
    },
  },
  // 방명록 - Get achievements for an associate
  {
    url: '/api/v1/communities/:communityId/associates/:associateId/achievements',
    body: {
      achievements: ACHIEVEMENTS,
    },
  },
  // 방명록 - Get guest books for an associate
  {
    url: '/api/v1/communities/:communityId/associates/:associateId/guest-books',
    body: {
      guestBooks: [],
      nextCursor: 0,
      hasNext: true
    },
  },
  // 방명록 - 4개만 불러오기
  {
    url: '/api/v1/communities/:communityId/associates/:associateId/guest-books?size=4',
    body: {
      guestBooks: GUEST_BOOK.slice(0, 4),
      pageInfo: { nextCursor: 0, hasNext: false },
    },
  },
  // 방명록 - Get MBTI tests for an associate
  {
    url: '/api/v1/communities/:communityId/associates/:associateId/mbti-tests',
    body: MBTI,
    // 실패 응답 테스트
    // status: 401,
    // message: 'Unauthorized',
  },
  // 방명록 - MBTI 등록
  {
    url: '/api/v1/communities/:communityId/associates/:associateId/mbti-tests',
    method: 'POST',
  },
  // 방명록 - Get profile images for an associate
  {
    url: '/api/v1/communities/:communityId/associates/:associateId/profile-images',
    body: {
      profileImages: PROFILE_IMAGES,
      nextCursor: 0,
      hasNext: true,
    },
  },
  // 방명록 리액션 생성
  {
    url: '/api/v1/communities/:communityId/associates/:associateId/guest-books',
    method: 'POST',
  },
  // Auth - Sign in
  {
    url: '/api/v1/sign-in',
    body: {
      token: 'mock-token',
    },
  },
  // Auth - Get member info
  {
    url: '/api/v1/members',
    body: {
      memberId: 1,
      name: '홍길동',
      kakaoId: 123456789,
      email: 'honggildong@example.com',
      token: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      },
    },
  },
  // Auth - Get member's associates
  {
    url: '/api/v1/members/associates',
    body: {
      communities: [],
    },
  },
  // 포스트 상세 조회
  {
    url: '/api/v1/communities/:communityId/memories/:memoryId/posts/:postId',
    body: POSTS[0],
  },
  // 포스트 목록 조회
  {
    url: '/api/v1/communities/:communityId/memories/:memoryId',
    body: {
      posts: POSTS,
      nextCursor: 0, hasNext: true,
    },
  },
  // Reaction - Get voices in a community
  {
    url: '/api/v1/communities/:communityId/voices',
    body: {
      voices: VOICES,

      nextCursor: 0,
      hasNext: false,
    },
  },
  // Reaction - Get emojis in a community
  {
    url: '/api/v1/communities/:communityId/emoji',
    body: {
      emoji: EMOJIS,
      nextCursor: 0,
      hasNext: false,
    },
  },
  // Notification - Get notifications
  {
    url: '/api/v1/notifications',
    body: {
      notifications: NOTIFICATIONS,

      nextCursor: 0,
      hasNext: false,
    },
  },
  // Notification - Get unread notification count
  {
    url: '/api/v1/notifications/unread',
    body: {
      hasUnread: true,
      count: 2,
    },
  },
])
