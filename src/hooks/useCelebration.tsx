import { CelebrationContext } from '@/contexts/CelebrationProvider'
import { useCallback, useContext } from 'react'

interface CelebrationConfig {
  title: string
  message: string
}

export function useCelebration() {
  const { setConfig, setClose, setIsOpen } = useContext(CelebrationContext)

  const triggerCelebration = useCallback(
    async (config: CelebrationConfig) => {
      setConfig(config)
      setIsOpen(true)
      return new Promise<void>(resolve => {
        setClose({
          fn: () => {
            setIsOpen(false)
            resolve()
            console.log('close called')
          },
        })
      })
    },
    [setConfig, setClose, setIsOpen],
  )

  return { triggerCelebration }
}
