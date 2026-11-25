import { ChevronDown, Clock, Mail, MessageCircle, type LucideIcon } from 'lucide-react'
import PageIntro from '../../components/layout/PageIntro'
import { faqs } from '../../data/faqs'
import { siteInfo } from '../../data/siteInfo'
import { usePageTitle } from '../../hooks/usePageTitle'

const contacts: { Icon: LucideIcon; title: string; value: string; href?: string; external?: boolean }[] = [
  { Icon: Mail, title: 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}` },
  { Icon: MessageCircle, title: 'WhatsApp', value: siteInfo.whatsappDisplay, href: siteInfo.whatsappLink, external: true },
  { Icon: Clock, title: 'Jam layanan', value: siteInfo.hours },
]

export default function HelpPage() {
  usePageTitle('Bantuan')

  return (
    <>
      <PageIntro title="Bantuan" intro="Jawaban untuk pertanyaan yang paling sering muncul. Kalau belum ketemu, hubungi kami lewat kontak di bawah." />

      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28 px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="text-h2 text-ink">
            Pertanyaan umum
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card shadow-sm open:shadow-md">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 text-body font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown size={20} strokeWidth={1.75} className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden />
                </summary>
                <p className="px-5 pb-5 text-body leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" aria-labelledby="kontak-title" className="scroll-mt-28 bg-muted/60 px-4 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 id="kontak-title" className="text-h2 text-ink">
            Kontak bantuan
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {contacts.map(({ Icon, title, value, href, external }) => {
              const body = (
                <>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary-subtle text-primary-darker">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="mt-3 text-small text-muted-foreground">{title}</span>
                  <span className="text-small font-semibold break-all text-ink">{value}</span>
                </>
              )
              const cls = 'flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm'
              return (
                <li key={title}>
                  {href ? (
                    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={`${cls} transition-shadow hover:shadow-md`}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-caption text-muted-foreground">Alamat email dan nomor WhatsApp di atas masih contoh. Ganti dengan kontak resmi sebelum diluncurkan.</p>
        </div>
      </section>
    </>
  )
}
