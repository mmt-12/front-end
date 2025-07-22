import { useHeaderStore } from '@/store/headerStore'
import type { IHeaderItem } from '@/types/common'
import { useEffect } from 'react'

interface Props {
  routeName: string
  leftItem: IHeaderItem
  rightItem: IHeaderItem
}

export default function useHeader(props: Props) {
  const headerState = useHeaderStore(state => state)

  useEffect(() => {
    headerState.setRouteName(props.routeName)
    headerState.setLeftItem(props.leftItem)
    headerState.setRightItem(props.rightItem)
  }, [])

  return {
    headerState,
  }
}
