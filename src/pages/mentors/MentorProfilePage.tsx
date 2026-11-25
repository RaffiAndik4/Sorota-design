import { Clock, Info, MapPin, Video, Wallet, Zap } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PageIntro from '../../components/layout/PageIntro'
import Avatar from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import Breadcrumb from '../../components/ui/Breadcrumb'
import { buttonClasses } from '../../components/ui/buttonStyles'
import Rating from '../../components/ui/Rating'
import { categoryLabel, getMentor, mentorSlots } from '../../data/mentors'
import { usePageTitle } from '../../hooks/usePageTitle'
import { formatSlot, rupiah } from '../../lib/format'

export default function MentorProfilePage() {
  const { id } = useParams()
  const mentor = getMentor(id)
  usePageTitle(mentor ? mentor.name : 'Mentor tidak ditemukan')

  if (!mentor) {
    return (
      <PageIntro title="Mentor tidak ditemukan" intro="Profil yang kamu cari tidak ada atau sudah dipindahkan.">
        <Link to="/mentor" className={`${buttonClasses('primary', 'md')} mt-6`}>
          Lihat semua mentor
        </Link>
      </PageIntro>
    )
  }

  const slots = mentorSlots(mentor).slice(0, 3)
  const bookTo = `/mentor/${mentor.id}/pesan`

  return (
    <>
      <section className="bg-[radial-gradient(ellipse_90%_100%_at_70%_0%,var(--primary-light),transparent_65%),linear-gradient(to_bottom,var(--primary-lighter),var(--primary-subtle)_70%,var(--background))] px-4 pt-28 pb-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb items={[{ label: 'Mentor', to: '/mentor' }, { label: mentor.name }]} />
        </div>
      </section>

      <div className="px-4 pb-32 sm:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-12">
            {/* Kepala profil: foto, nama, keahlian utama */}
            <header className="-mt-2 flex flex-col gap-6 sm:flex-row sm:items-start">
              <Avatar name={mentor.name} size={160} tone={mentor.index} shape="square" src={mentor.photo} pos={mentor.photoPos} className="shadow-lg ring-4 ring-card" />
              <div className="min-w-0">
                <Badge>{categoryLabel(mentor.category)}</Badge>
                <h1 className="mt-3 text-h1 text-ink">{mentor.name}</h1>
                <p className="mt-2 text-body leading-relaxed text-muted-foreground md:text-lg">{mentor.headline}</p>
                <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-muted-foreground">
                  {mentor.rating !== undefined && (
                    <li>
                      <Rating value={mentor.rating} count={mentor.reviews} />
                    </li>
                  )}
                  <li className="flex items-center gap-1.5">
                    <MapPin size={16} strokeWidth={1.75} aria-hidden />
                    {mentor.sectors.join(', ')}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Zap size={16} strokeWidth={1.75} className="text-primary-darker" aria-hidden />
                    Biasa merespons &lt; 24 jam
                  </li>
                </ul>
              </div>
            </header>

            <section aria-labelledby="tentang-title">
              <h2 id="tentang-title" className="text-h2 text-ink">
                Tentang mentor
              </h2>
              <p className="mt-3 max-w-2xl text-body leading-relaxed text-muted-foreground">{mentor.summary}</p>
            </section>

            {mentor.highlights.length > 0 && (
              <section aria-labelledby="sorotan-title">
                <h2 id="sorotan-title" className="text-h2 text-ink">
                  Sorotan pengalaman
                </h2>
                <ul className="mt-5 flex flex-col border-l-2 border-primary-lighter">
                  {mentor.highlights.map((h) => (
                    <li key={h} className="relative pb-4 pl-6 text-body font-medium text-ink last:pb-0">
                      <span aria-hidden className="absolute top-2 -left-[7px] size-3 rounded-full border-2 border-card bg-primary-darker" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="keahlian-title">
              <h2 id="keahlian-title" className="text-h2 text-ink">
                Keahlian
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {mentor.topics.map((t) => (
                  <li key={t} className="rounded-full border border-border bg-card px-4 py-2 text-small text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="sektor-title">
              <h2 id="sektor-title" className="text-h2 text-ink">
                Sektor yang didampingi
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {mentor.sectors.map((t) => (
                  <li key={t} className="rounded-full bg-primary-subtle px-4 py-2 text-small font-medium text-primary-dark">
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            <p className="text-caption text-muted-foreground">Data mentor dan harga disalin dari desain Sorota.</p>
          </div>

          {/* Rincian sesi: kartu tetap di desktop */}
          <aside aria-label="Rincian sesi" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
              <h2 className="text-h3 text-ink">Rincian sesi</h2>
              <dl className="mt-5 flex flex-col gap-4 border-y border-border py-5 text-small">
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={16} strokeWidth={1.75} aria-hidden /> Durasi sesi
                  </dt>
                  <dd className="font-medium text-ink">{mentor.durationMin} menit</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Video size={16} strokeWidth={1.75} aria-hidden /> Format
                  </dt>
                  <dd className="text-right font-medium text-ink">Online via Google Meet</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Wallet size={16} strokeWidth={1.75} aria-hidden /> Biaya
                  </dt>
                  <dd className="text-h3 text-ink">{rupiah(mentor.price)}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="text-caption font-medium text-muted-foreground">Jadwal tersedia (usulan)</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <li key={s} className="rounded-full bg-primary-subtle px-3 py-1 text-caption font-medium text-primary-dark">
                      {formatSlot(s)}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={bookTo} className={`${buttonClasses('primary', 'lg')} mt-6 w-full`}>
                Booking sesi
              </Link>
              <p className="mt-4 flex gap-2 text-caption leading-relaxed text-muted-foreground">
                <Info size={14} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden />
                Booking diteruskan ke mentor untuk dikonfirmasi. Mentor merespons dalam 24 jam.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Bilah booking tetap di HP supaya tombol selalu terjangkau */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
        <p className="text-small text-ink">
          <span className="text-h3">{rupiah(mentor.price)}</span> <span className="text-muted-foreground">/ sesi</span>
        </p>
        <Link to={bookTo} className={buttonClasses('primary', 'md')}>
          Booking sesi
        </Link>
      </div>
    </>
  )
}
