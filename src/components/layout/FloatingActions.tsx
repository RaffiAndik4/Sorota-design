import { ChevronUp, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteInfo } from '../../data/siteInfo'

/** Pojok kanan bawah: tombol kembali ke atas (muncul setelah scroll) dan tombol bantuan via WhatsApp. */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setShowTop(window.scrollY > 400)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    // Di HP naik sedikit agar tidak menutupi bilah booking di halaman profil mentor
    <div className="fixed right-4 bottom-24 z-40 flex flex-col items-end gap-3 sm:right-6 lg:bottom-6">
      <button
        type="button"
        onClick={toTop}
        aria-label="Kembali ke atas"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={`flex size-12 items-center justify-center rounded-full border border-primary-lighter bg-primary-subtle text-primary-darker shadow-md transition-[opacity,translate,background-color] duration-300 hover:bg-primary-lighter motion-reduce:transition-none ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ChevronUp size={22} strokeWidth={2.25} aria-hidden />
      </button>

      <a
        href={siteInfo.whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex size-12 items-center justify-center gap-2 rounded-full border border-primary-darker bg-card text-small sm:size-auto sm:min-h-11 sm:px-4 font-semibold text-primary-darker shadow-md transition-colors hover:bg-primary-subtle"
      >
        <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
        <span className="sr-only sm:not-sr-only">Butuh Bantuan?</span>
        <span className="sr-only">(buka WhatsApp di tab baru)</span>
      </a>
    </div>
  )
}
