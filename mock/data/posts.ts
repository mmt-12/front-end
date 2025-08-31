import type { Post } from '../../src/types/api'

export const POSTS: Post[] = [
  {
    id: 1,
    pictures: [
      '/test_images/image1.png',
      '/test_images/image2.png',
      '/test_images/image3.png',
      '/test_images/image4.png',
    ],
    content: '이것은 첫 번째 포스트의 내용입니다.',
    author: {
      id: 3,
      nickname: '홍길동',
      imageUrl: 'test_images/profile1.png',
    },
    createdAt: '2023-01-01T12:00:00Z',
    comments: {
      emojis: [],
      voices: [],
      temporaryVoices: [],
    },
  },
]
