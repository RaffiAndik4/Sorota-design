import { Link } from 'react-router-dom'
import { navLinks, siteInfo } from '../../data/siteInfo'
import Logo from '../Logo'

export default function Footer() {
  return (
    <footer className="border-t border-primary-lighter bg-linear-to-b from-primary-subtle to-primary-lighter/40 px-4 pt-14 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1.2fr]">
          <div className="flex max-w-md flex-col items-start gap-4">
            <Logo height={20} />
            <p className="text-small leading-relaxed text-muted-foreground">
              Platform konsultasi bisnis 1-on-1 untuk pengusaha muda Indonesia. Pilih mentormu, booking sesi, dan pulang bawa
              langkah konkret.
            </p>
          </div>

          <nav aria-label="Menu footer">
            <h2 className="text-small font-semibold text-ink">Menu</h2>
            <ul className="mt-3 flex flex-col">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-11 sm:min-h-9 items-center text-small text-muted-foreground hover:text-ink hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-small font-semibold text-ink">Kontak Bantuan</h2>
            <ul className="mt-3 flex flex-col">
              <li>
                <a href={`mailto:${siteInfo.email}`} className="inline-flex min-h-11 sm:min-h-9 items-center text-small text-muted-foreground hover:text-ink hover:underline">
                  {siteInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 sm:min-h-9 items-center text-small text-muted-foreground hover:text-ink hover:underline"
                >
                  WhatsApp: {siteInfo.whatsappDisplay}
                </a>
              </li>
              <li className="inline-flex min-h-11 sm:min-h-9 items-center text-small text-muted-foreground">{siteInfo.hours}</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-caption text-muted-foreground">
          © {siteInfo.year} {siteInfo.name}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}
