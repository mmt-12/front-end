export const POST = {
  id: '1',
  images: [
    '/test_images/image1.png',
    '/test_images/image2.png',
    '/test_images/image3.png',
    '/test_images/image4.png',
  ],
  content: '이것은 첫 번째 포스트의 내용입니다.',
  author: {
    id: 'user1',
    name: '홍길동',
    profileImage: 'test_images/profile1.png',
  },
  createdAt: new Date('2023-01-01T12:00:00Z'),
}
