import { useState } from 'react'

import InputField from '@/components/common/InputField'
import useHeader from '@/hooks/useHeader'

export default function EditProfilePage() {
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  const [name, setName] = useState('')
  const [introduction, setIntroduction] = useState('')

  return (
    <>
      <InputField
        label='이름'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <InputField
        label='한줄소개'
        type='textarea'
        value={introduction}
        onChange={e => setIntroduction(e.target.value)}
      />
    </>
  )
}
