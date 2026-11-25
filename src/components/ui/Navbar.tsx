import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from '../Logo'
import Button from './Button'

// Menu mengikuti sitemap (docs/sitemap-user-flow.md). Tanpa login/daftar: sesi tidak butuh akun.
const links = ['Tentang Layanan', 'Mentor', 'Bantuan']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Logo height={22} />
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()} className="inline-flex min-h-11 items-center rounded-lg px-3 text-small font-medium text-ink hover:bg-muted">
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button>Cari mentor</Button>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-ink hover:bg-muted md:hidden"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-6 py-3 md:hidden">
          {links.map((l) => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()} className="inline-flex min-h-11 items-center rounded-lg px-3 text-small font-medium text-ink hover:bg-muted">
              {l}
            </a>
          ))}
          <Button className="mt-2 w-full">Cari mentor</Button>
        </div>
      )}
    </header>
  )
}
