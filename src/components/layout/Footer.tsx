import { Mail, MessageCircle } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { siteInfo } from '../../data/siteInfo'
import Logo from '../Logo'

// Hanya tautan ke halaman yang benar-benar ada.
const columns = [
  {
    title: 'Produk',
    links: [
      { to: '/#cara-kerja', label: 'Cara Kerja' },
      { to: '/mentor', label: 'Cari Mentor' },
      { to: '/bantuan#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { to: '/tentang', label: 'Tentang' },
      { to: '/bantuan#kontak', label: 'Kontak' },
    ],
  },
]

const linkClass = 'inline-flex min-h-11 items-center text-small text-muted-foreground hover:text-ink hover:underline sm:min-h-9'
const iconLink =
  'inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/60 hover:text-ink sm:size-10'

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  )
}

/** Form langganan. Prototipe: belum ada server, jadi email tidak disimpan dan pesannya jujur soal itu. */
function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'error' | 'ok'>('idle')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState('error')
      return
    }
    setState('ok')
    setEmail('')
  }

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-caption font-semibold tracking-wider text-ink uppercase">Newsletter</h2>
      <p className="mt-1 text-small text-muted-foreground">Dapat tips bisnis dan kabar terbaru dari Sorota.</p>
      <form onSubmit={submit} noValidate className="mt-3 flex gap-2">
        <label htmlFor={id} className="sr-only">
          Email untuk newsletter
        </label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state !== 'idle') setState('idle')
          }}
          placeholder="emailmu@gmail.com"
          aria-invalid={state === 'error'}
          aria-describedby={`${id}-msg`}
          className="min-h-11 min-w-0 flex-1 rounded-full border border-input bg-card px-4 text-small text-ink placeholder:text-muted-foreground focus:border-primary-darker"
        />
        <button
          type="submit"
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-primary-darker px-5 text-small font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Daftar
        </button>
      </form>
      <p id={`${id}-msg`} aria-live="polite" className="mt-2 min-h-5 text-caption text-muted-foreground">
        {state === 'error' && 'Format email belum benar. Tulis lengkap, contoh: nama@gmail.com.'}
        {state === 'ok' && 'Terima kasih! (Prototipe: email belum disimpan karena belum ada server.)'}
      </p>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-primary-lighter bg-linear-to-b from-primary-subtle to-primary-lighter/40 px-4 pt-14 pb-32 sm:px-8 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="flex flex-col items-start gap-6">
            <div className="max-w-md">
              <Logo height={22} />
              <p className="mt-4 text-small leading-relaxed text-muted-foreground">
                Temukan arah bisnismu bersama Sorota. Framework terstruktur dan konsultasi 1-on-1 dengan mentor berpengalaman, dari
                mengenali diri hingga mengembangkan bisnis.
              </p>
            </div>
            <Newsletter />
          </div>

          <nav aria-label="Menu footer" className="grid grid-cols-2 gap-x-12 gap-y-8 md:gap-x-14">
            {columns.map((c) => (
              <div key={c.title}>
                <h2 className="text-caption font-semibold tracking-wider text-ink uppercase">{c.title}</h2>
                <ul className="mt-3 flex flex-col">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            © {siteInfo.year} {siteInfo.name}. Hak cipta dilindungi.
          </p>
          <ul className="flex items-center gap-1 sm:-mr-2">
            <li>
              <a href={siteInfo.instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram Sorota (tab baru)" className={iconLink}>
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href={siteInfo.whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp Sorota (tab baru)" className={iconLink}>
                <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
              </a>
            </li>
            <li>
              <a href={`mailto:${siteInfo.email}`} aria-label={`Email ${siteInfo.email}`} className={iconLink}>
                <Mail size={20} strokeWidth={1.75} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
