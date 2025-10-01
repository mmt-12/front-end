import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { usePost, useUpdatePost } from '@/api'
import { useMemoryDetail } from '@/api/memory'
import PostRegisterView from '@/components/post/PostRegisterView'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function PostEditPage() {
  useHeader({
    routeName: '포스트',
    rightItem: {
      icon: null,
    },
  })

  const navigate = useNavigate()
  const communityId = useUserStore(s => s.communityId)
  const { alert } = useModal()

  const memoryId = Number(useParams().memoryId)
  const postId = Number(useParams().postId)

  const { data: memory } = useMemoryDetail(communityId, memoryId)
  const { data: oldPost } = usePost(communityId, memoryId, postId)
  const { mutate: updatePost } = useUpdatePost(communityId, memoryId, postId)

  const [oldImageUrls, setOldImageUrls] = useState<string[]>([])

  const [description, setDescription] = useState<string>('')
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])

  useEffect(() => {
    if (!oldPost) return
    setDescription(oldPost.content)
    setOldImageUrls(oldPost.pictures)
  }, [oldPost])

  const handleSubmit = () => {
    if (newImageFiles.length + oldImageUrls.length === 0)
      return alert('사진을 최소 1장 이상 등록해주세요.')
    if (description.trim() === '') return alert('설명을 입력해주세요.')

    const formData = new FormData()
    newImageFiles
      .toReversed()
      .forEach(image => formData.append('newPictures', image))
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            content: description,
            oldPictures: oldImageUrls,
          }),
        ],
        {
          type: 'application/json',
        },
      ),
    )
    updatePost(formData, {
      onSuccess: () => {
        navigate(ROUTES.MEMORY_DETAIL(memoryId))
        alert('포스트가 수정되었습니다.')
      },
    })
  }

  const images = useMemo(() => {
    return [...newImageFiles, ...oldImageUrls]
  }, [newImageFiles, oldImageUrls])

  const setImages = useCallback((newImages: (File | string)[]) => {
    const files: File[] = []
    const urls: string[] = []

    newImages.forEach(image => {
      if (typeof image === 'string') {
        urls.push(image)
      } else {
        files.push(image)
      }
    })

    setOldImageUrls(urls)
    setNewImageFiles(files)
  }, [])

  return (
    <PostRegisterView
      action='EDIT'
      memory={memory}
      images={images}
      setImages={setImages}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
    />
  )
}
