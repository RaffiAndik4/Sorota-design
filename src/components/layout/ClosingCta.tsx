import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'

/** CTA penutup: dipakai di Beranda dan Tentang Layanan. Satu-satunya elemen kuning di bagiannya. */
export default function ClosingCta() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3)
  return (
    <section aria-labelledby="closing-title" className="px-4 pb-24 sm:px-8">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl rounded-3xl border border-white bg-linear-to-b from-card to-primary-subtle px-6 py-14 text-center shadow-lg transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none sm:px-12 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 id="closing-title" className="text-section text-balance text-ink">
          Siap memilih mentor yang sesuai?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-body text-muted-foreground">
          Pilih topik masalah bisnismu, lihat profil mentornya, lalu booking sesi 1-on-1.
        </p>
        <Link
          to="/mentor"
          className="mt-8 inline-flex min-h-13 items-center justify-between gap-4 rounded-full bg-highlight py-2 pr-2 pl-6 text-body font-semibold text-ink transition-colors duration-200 hover:bg-highlight-light"
        >
          Cari mentor
          <span className="flex size-8 items-center justify-center rounded-full bg-ink text-white">
            <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
          </span>
        </Link>
      </div>
    </section>
  )
}
