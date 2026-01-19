import { useEffect } from 'react'

export function useThemeColor (color: string) {
  useEffect(() => {
    const metaTag = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    )
    if (metaTag) {
      metaTag.setAttribute('content', color)
    }
  }, [color])
}
