import PostContent from '@/components/memory/PostContent/PostContent'

export default function PostDetailPage() {
  const postContent = {
    images: [
      '/test_images/image1.png',
      '/test_images/image2.png',
      '/test_images/image3.png',
    ],
    content: '첫 번째 포스트 내용입니다.',
    author: {
      id: '1',
      name: '홍길동',
      imageUrl: '/test_images/image5.png',
    },
    createdAt: new Date('2025-06-20T12:00:00'),
  }
  return (
    <div>
      <PostContent {...postContent} />
      <p>reactions here</p>
    </div>
  )
}
