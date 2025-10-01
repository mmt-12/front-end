// stores setting of the application

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingState {
  memoryListView: 'list' | 'grid' // View mode for memory list
  setMemoryListView: (_view: 'list' | 'grid') => void // Function to set the view mode
}

export const useSettingStore = create<SettingState>()(
  persist(
    set => ({
      memoryListView: 'grid',
      setMemoryListView: (view: 'list' | 'grid') =>
        set({ memoryListView: view }),
    }),
    {
      name: 'setting-storage',
    },
  ),
)
