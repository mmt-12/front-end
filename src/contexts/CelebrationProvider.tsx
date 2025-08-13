import React, { createContext, useCallback, useState } from 'react'

interface Props {
  children: React.ReactNode
}

interface ICelebrationContext {
  config: Record<string, any>
  setConfig: (_config: Record<string, any>) => void
  isOpen: boolean
  setIsOpen: (_isOpen: boolean) => void
  open: () => void
  close: { fn: () => void }
  setClose: (_close: { fn: () => void }) => void
}

const CelebrationContext = createContext<ICelebrationContext>({
  config: {},
  setConfig: () => {},
  isOpen: false,
  setIsOpen: () => {},
  open: () => {},
  close: { fn: () => {} },
  setClose: () => {},
})

function CelebrationProvider({ children }: Props) {
  const [config, setConfig] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [close, setClose] = useState({ fn: () => {} })
  const open = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <CelebrationContext.Provider
      value={{ config, setConfig, isOpen, setIsOpen, open, close, setClose }}
    >
      {children}
    </CelebrationContext.Provider>
  )
}

export { CelebrationProvider, CelebrationContext }
