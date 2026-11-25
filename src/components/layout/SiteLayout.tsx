import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FloatingActions from './FloatingActions'
import Footer from './Footer'
import SiteNavbar from './SiteNavbar'

export default function SiteLayout() {
  const { pathname, hash } = useLocation()

  // Pindah halaman: kembali ke atas, kecuali ada anchor (#kontak, dst.)
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a
        href="#konten"
        className="sr-only z-[60] rounded-lg bg-ink px-4 py-2 text-small font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Lewati ke konten
      </a>
      <SiteNavbar />
      <main id="konten">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
