import { useEffect } from 'react'

export default function useStardust() {
  useEffect(() => {
    document.body.classList.add('stardust')
    return () => {
      document.body.classList.remove('stardust')
    }
  }, [])
}
