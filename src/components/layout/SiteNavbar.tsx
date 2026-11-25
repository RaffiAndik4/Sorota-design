import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { aboutLink, navLinks } from '../../data/siteInfo'
import Logo from '../Logo'

const pill =
  'min-h-11 items-center gap-2 rounded-full text-small font-semibold whitespace-nowrap transition-colors duration-200'

// "Liquid glass": latar putih sangat tembus pandang dengan blur & saturasi kuat, tepi terang, highlight di bagian dalam,
// dan kilau diagonal. Jika browser tidak mendukung backdrop-filter, latar jadi hampir solid supaya teks tetap terbaca.
const glass =
  'border border-white/60 bg-white/90 supports-[backdrop-filter]:bg-white/25 ' +
  'backdrop-blur-2xl backdrop-saturate-200 ' +
  'shadow-[0_10px_40px_rgba(16,21,16,0.10),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.35),inset_0_0_24px_rgba(255,255,255,0.28)]'

const sheen =
  'pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0)_68%,rgba(255,255,255,0.3)_100%)]'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex min-h-11 items-center rounded-full px-4 text-small transition-colors hover:bg-white/50 ${
    isActive
      ? 'font-semibold text-ink after:absolute after:inset-x-4 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-primary-darker'
      : 'font-medium text-ink'
  }`

// "Mentor" dan "Pesanan" berbagi halaman /mentor (tab Sesi saya), jadi status aktifnya dihitung dari path + query.
function useIsActive() {
  const { pathname, search } = useLocation()
  const sesi = new URLSearchParams(search).get('tab') === 'sesi'
  return (to: string, end?: boolean) => {
    if (to.startsWith('/mentor?tab=sesi')) return (pathname === '/mentor' && sesi) || pathname.startsWith('/pesanan')
    if (to === '/mentor') return (pathname === '/mentor' && !sesi) || (pathname.startsWith('/mentor/') && !pathname.startsWith('/pesanan'))
    return end ? pathname === to : pathname === to || pathname.startsWith(to + '/')
  }
}

export default function SiteNavbar() {
  const isActive = useIsActive()
  // Menu HP otomatis tertutup saat pindah halaman (terbuka hanya untuk path tempat ia dibuka)
  const { pathname } = useLocation()
  const [openFor, setOpenFor] = useState<string | null>(null)
  const open = openFor === pathname
  const setOpen = (fn: boolean | ((o: boolean) => boolean)) => {
    const next = typeof fn === 'function' ? fn(open) : fn
    setOpenFor(next ? pathname : null)
  }

  // Escape menutup menu
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenFor(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Navbar menghilang saat scroll ke bawah dan muncul lagi saat scroll ke atas. Selalu tampil di paling atas halaman.
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      if (y < 80) setHidden(false)
      else if (y - lastY > 6) setHidden(true)
      else if (lastY - y > 6) setHidden(false)
      lastY = y
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  // Tetap tampil bila menu HP terbuka atau fokus keyboard ada di dalam navbar
  const away = hidden && !open

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-none focus-within:translate-y-0 focus-within:opacity-100 ${
        away ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className={`${glass} relative grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full px-6`}>
          <span aria-hidden className={sheen} />

          <Link to="/" aria-label="Sorota, ke beranda" className="col-start-1 inline-flex min-h-11 items-center justify-self-start">
            <Logo height={18} />
          </Link>

          <nav aria-label="Navigasi utama" className="col-start-2 hidden items-center gap-0.5 justify-self-center lg:flex">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} aria-current={isActive(l.to, l.end) ? 'page' : undefined} className={linkClass({ isActive: isActive(l.to, l.end) })}>
                {l.label}
              </Link>
            ))}
            {/* Di layar sedang (lg), tombol Tentang di kanan belum muncul, jadi tampil sebagai tautan biasa di sini */}
            <Link
              to={aboutLink.to}
              aria-current={isActive(aboutLink.to) ? 'page' : undefined}
              className={`${linkClass({ isActive: isActive(aboutLink.to) })} xl:hidden`}
            >
              {aboutLink.label}
            </Link>
          </nav>

          <div className="col-start-3 -mr-3.5 flex items-center justify-end gap-2">
            <Link
              to={aboutLink.to}
              aria-current={isActive(aboutLink.to) ? 'page' : undefined}
              className={`${pill} hidden border border-white/70 px-5 text-ink hover:bg-white/60 xl:inline-flex ${
                isActive(aboutLink.to) ? 'bg-white/70' : 'bg-white/30'
              }`}
            >
              {aboutLink.label} <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
            </Link>
            <Link to="/mentor" className={`${pill} hidden bg-ink px-5 text-white hover:bg-primary-dark sm:inline-flex`}>
              Mulai konsultasi
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/30 text-ink hover:bg-white/60 lg:hidden"
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className={`${glass} mt-2 flex flex-col gap-1 rounded-3xl p-3 lg:hidden`}>
            {[...navLinks, aboutLink].map((l) => (
              <Link
                key={l.to}
                onClick={() => setOpenFor(null)}
                to={l.to}
                aria-current={isActive(l.to, (l as { end?: boolean }).end) ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center rounded-xl px-3 text-small hover:bg-white/50 ${
                  isActive(l.to, (l as { end?: boolean }).end) ? 'bg-white/60 font-semibold text-primary-darker' : 'font-medium text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/mentor" onClick={() => setOpenFor(null)} className={`${pill} mt-1 inline-flex justify-center bg-ink px-5 text-white`}>
              Mulai konsultasi
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
