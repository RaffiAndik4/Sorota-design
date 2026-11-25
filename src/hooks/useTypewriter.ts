import { useEffect, useState } from 'react'

// Kata yang diketik bergantian pada placeholder pencarian (beranda dan Daftar Mentor).
export const searchWords = ['coffee shop', 'marketing', 'keuangan', 'legalitas']

const TYPE_MS = 90
const DELETE_MS = 45
const HOLD_MS = 1400
const GAP_MS = 350

/** Efek mesin ketik: mengetik satu kata, menahan, menghapus, lalu pindah ke kata berikutnya. */
export function useTypewriter(list: string[], active: boolean) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!active) return
    let w = 0
    let i = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const word = list[w]
      if (!deleting) {
        i += 1
        setText(word.slice(0, i))
        if (i === word.length) {
          deleting = true
          timer = setTimeout(tick, HOLD_MS)
          return
        }
        timer = setTimeout(tick, TYPE_MS)
      } else {
        i -= 1
        setText(word.slice(0, i))
        if (i === 0) {
          deleting = false
          w = (w + 1) % list.length
          timer = setTimeout(tick, GAP_MS)
          return
        }
        timer = setTimeout(tick, DELETE_MS)
      }
    }

    timer = setTimeout(tick, 500)
    return () => {
      clearTimeout(timer)
      setText('') // reset saat berhenti (mis. pengguna mulai mengetik)
    }
  }, [list, active])

  return text
}

/** Pengguna memilih "reduce motion": animasi diganti kata pertama saja. */
export function usePrefersReducedMotion() {
  const [reduce] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  return reduce
}
