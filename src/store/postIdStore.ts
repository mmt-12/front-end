import { create } from 'zustand'

interface PostIdState {
  postId: number
  setPostId: (_postId: number) => void
}

export const usePostIdStore = create<PostIdState>()(set => ({
  postId: -1,
  setPostId: (_postId: number) => set({ postId: _postId }),
}))
