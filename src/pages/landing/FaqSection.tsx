import { ChevronDown } from 'lucide-react'
import { faqs } from '../../data/faqs'

// Enam pertanyaan pertama saja; selengkapnya ada di halaman Bantuan.
const shown = faqs.slice(0, 6)

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-home-title" className="bg-background px-4 pt-24 pb-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 id="faq-home-title" className="text-center text-section text-balance text-ink">
          Pertanyaan yang sering muncul
        </h2>
        <p className="mt-3 text-center text-body text-muted-foreground">Masih ragu sebelum booking? Ini jawaban singkatnya.</p>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          {shown.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card shadow-sm transition-shadow open:shadow-md">
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
  )
}
