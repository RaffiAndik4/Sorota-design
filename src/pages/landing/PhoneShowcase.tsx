import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Chip } from '../../components/ui/Badge'
import { buttonClasses } from '../../components/ui/buttonStyles'
import { activeCategories } from '../../data/mentors'
import { useInView } from '../../hooks/useInView'

const copy = {
  headline: 'Lagi bingung menentukan langkah bisnis?',
  subheadline: 'Bahas bareng mentor di Sorota.',
  title: 'Nggak harus mencari jawabannya sendiri.',
  body: 'Penjualan belum stabil, promosi belum efektif, atau bingung mulai dari mana? Ceritakan tantangan bisnismu lewat mentoring 1-on-1 di sorota.',
  points: ['Bahas langsung masalah yang sedang kamu hadapi', 'Pilih mentor sesuai kebutuhan bisnismu', 'Susun langkah berikutnya bersama mentor'],
  cardTitle: 'Apa yang ingin kamu bereskan dulu?',
  cardSub: 'Pilih topik yang paling dekat dengan tantangan bisnismu.',
  cta: 'Temukan mentor yang sesuai',
}

// Nama pilihan di section ini lebih singkat dari nama kategori di Daftar Mentor
const topicLabels: Record<string, string> = { menu: 'Produk' }

// Hanya kategori yang punya mentor, supaya tombol tidak berujung hasil kosong
const topics = activeCategories.map((c) => ({ id: c.id as string, label: topicLabels[c.id] ?? (c.label as string) }))

export default function PhoneShowcase() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2)
  const [topicId, setTopicId] = useState(topics[0].id)
  const topic = topics.find((t) => t.id === topicId) ?? topics[0]

  return (
    // Section terpisah dari hero (hero memenuhi 100% tinggi layar)
    <section aria-labelledby="showcase-title" className="flex min-h-svh items-center overflow-x-clip px-4 py-24 sm:px-8">
      <div ref={ref} className="mx-auto w-full max-w-5xl">
        <h2
          id="showcase-title"
          className={`text-center text-section text-balance text-ink transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {copy.headline}
        </h2>
        <p
          className={`mt-3 text-center text-body text-muted-foreground transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none md:text-lg ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: inView ? '80ms' : '0ms' }}
        >
          {copy.subheadline}
        </p>

        <div className="mt-14 grid items-center gap-14 lg:mt-20 lg:grid-cols-[1fr_340px] lg:gap-16">
          {/* Kiri: teks + kartu pilihan topik */}
          <div
            className={`flex flex-col gap-8 transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: inView ? '150ms' : '0ms' }}
          >
            <div className="border-l-2 border-primary-darker pl-6">
              <h3 className="text-h2 text-ink">{copy.title}</h3>
              <p className="mt-3 max-w-lg text-body leading-relaxed text-muted-foreground">{copy.body}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {copy.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-small text-ink">
                    <Check size={18} strokeWidth={2.25} className="shrink-0 text-primary-darker" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-xl">
              <h3 className="text-h3 text-ink">{copy.cardTitle}</h3>
              <p className="mt-1 text-small text-muted-foreground">{copy.cardSub}</p>

              <div role="group" aria-label="Pilih topik" className="mt-4 flex flex-wrap gap-2">
                {topics.map(({ id, label }) => (
                  <Chip key={id} selected={topicId === id} onClick={() => setTopicId(id)}>
                    {label}
                  </Chip>
                ))}
              </div>

              <Link to={`/mentor?kebutuhan=${topic.id}`} className={`${buttonClasses('highlight', 'lg')} mt-6`}>
                {copy.cta}
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Kanan: HP transparan dengan bayangan (muncul naik pelan saat di-scroll) */}
          <div className="relative isolate mx-auto w-[260px] sm:w-[300px] lg:w-[340px]">
            {/* Bayangan: dua lapisan buram berbentuk HP di belakang foto (jatuh ke kanan-bawah) */}
            <div
              aria-hidden
              className={`absolute inset-x-[7%] inset-y-[4%] -z-10 translate-x-6 translate-y-10 rounded-[3.5rem] bg-ink/35 blur-2xl transition-opacity duration-700 motion-reduce:transition-none ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: inView ? '450ms' : '0ms' }}
            />
            <div
              aria-hidden
              className={`absolute inset-x-[8%] inset-y-[5%] -z-10 translate-y-3 rounded-[3.5rem] bg-ink/25 blur-md transition-opacity duration-700 motion-reduce:transition-none ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: inView ? '450ms' : '0ms' }}
            />
            <img
              src="/images/phone-call.webp"
              alt="Contoh sesi mentoring 1-on-1 lewat video call di HP: mentor di layar utama, pelaku usaha di kotak kecil"
              width={844}
              height={1500}
              decoding="async"
              className={`h-auto w-full transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:transition-none ${
                inView ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-16 scale-95 opacity-0'
              }`}
              style={{ transitionDelay: inView ? '250ms' : '0ms' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
