import { useEffect, useRef, useState } from 'react'

/**
 * Mengembalikan [ref, inView] untuk animasi "muncul saat di-scroll".
 * - inView menjadi true ketika minimal `threshold` bagian elemen terlihat.
 * - inView kembali false setelah elemen benar-benar keluar dari layar, sehingga animasi PUTAR ULANG
 *   setiap kali pengguna menggulir kembali ke bagian itu (tidak perlu refresh).
 * - Jika pengguna memilih "reduce motion", langsung true sehingga konten tampil tanpa animasi.
 */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [inView, setInView] = useState(reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) setInView(true)
        else if (entry.intersectionRatio === 0) setInView(false) // sudah di luar layar: siap diputar ulang
      },
      { threshold: [0, threshold] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion, threshold])

  return [ref, inView] as const
}
