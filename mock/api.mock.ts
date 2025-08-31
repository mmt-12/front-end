import { defineMock } from 'vite-plugin-mock-dev-server'

import { MEMORIES } from './data/memories'
import { POSTS } from './data/posts'

export default defineMock([
  {
    url: '/api/test',
    body: {
      message: 'Hello, world!',
    },
  },
  {
    url: '/api/v1/communities/:communityId/memories',
    body: {
      cursor: 0,
      hasNext: false,
      memories: MEMORIES,
    },
  },
  {
    url: '/api/v1/communities/:communityId/memories/:memoryId/posts',
    body: {
      cursor: 0,
      hasNext: false,
      posts: POSTS,
    },
  },
])
