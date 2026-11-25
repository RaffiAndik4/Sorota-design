import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · Sorota` : 'Sorota - Temukan Arah Bisnismu'
  }, [title])
}
