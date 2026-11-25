import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/ui/buttonStyles'
import { categoryLabel, mentors } from '../../data/mentors'
import { rupiah } from '../../lib/format'

/** Section mentor di beranda: kartu foto yang bisa digeser, dengan tombol panah. */
export default function MentorsShowcase() {
  const track = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const slide = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: reduce ? 'auto' : 'smooth' })
  }

  const arrow =
    'flex size-10 items-center justify-center rounded-full bg-muted text-ink transition-colors hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-muted'

  return (
    <section aria-labelledby="mentors-title" className="flex min-h-svh items-center overflow-x-clip px-4 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h2 id="mentors-title" className="mx-auto max-w-4xl text-center text-section text-balance text-ink">
          Mentor yang siap ada di sisimu.
        </h2>
        <p className="mt-3 text-center text-body text-muted-foreground">Pengalaman nyata di bidangnya. Pilih yang paling nyambung dengan bisnismu.</p>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" aria-label="Geser ke kiri" onClick={() => slide(-1)} disabled={edge.start} className={arrow}>
            <ArrowLeft size={18} strokeWidth={1.75} />
          </button>
          <button type="button" aria-label="Geser ke kanan" onClick={() => slide(1)} disabled={edge.end} className={arrow}>
            <ArrowRight size={18} strokeWidth={1.75} />
          </button>
        </div>

        <ul
          ref={track}
          onScroll={measure}
          className="mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {mentors.map((m) => (
            <li key={m.id} className="flex w-[66%] shrink-0 snap-start sm:w-[44%] md:w-[30%] lg:w-[23.5%]">
              <Link to={`/mentor/${m.id}`} className="group flex w-full flex-col rounded-2xl border border-border bg-card p-3 shadow-sm transition-[box-shadow,translate] duration-200 hover:shadow-lg motion-safe:hover:-translate-y-0.5">
                <span className="block aspect-square overflow-hidden rounded-xl bg-muted">
                  <img
                    src={m.photo}
                    alt={`Foto ${m.name}`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    style={{ objectPosition: m.photoPos }}
                  />
                </span>
                <span className="mt-3 flex min-h-[3.25rem] px-1 items-start justify-between gap-3">
                  <span className="line-clamp-2 text-body leading-snug font-semibold text-ink">{m.name}</span>
                  {m.rating !== undefined && (
                    <span className="mt-1 flex shrink-0 items-center gap-1 text-caption font-medium text-ink">
                      <Star size={12} className="fill-highlight text-highlight" aria-hidden />
                      {m.rating.toFixed(1)}
                    </span>
                  )}
                </span>
                <span className="mt-1 line-clamp-2 block min-h-[2.8rem] px-1 text-small leading-snug text-muted-foreground">{m.headline}</span>
                <span className="mx-1 mt-3 block border-t border-border pt-3 text-small font-medium text-primary-darker">{categoryLabel(m.category)}</span>
                <span className="mt-1 block px-1 pb-1 text-caption text-muted-foreground">{rupiah(m.price)} / sesi</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <Link to="/mentor" className={buttonClasses('primary', 'lg')}>
            Lihat semua mentor <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
