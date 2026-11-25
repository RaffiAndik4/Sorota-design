import { Clock, Copy, Info, User, Video, Wallet } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useTypewriter'

// Isi mengikuti docs/sitemap-user-flow.md. Nama, jadwal, dan data di ilustrasi hanya contoh.
// Kata kunci bergaya stabilo: teks Ink tebal dengan sapuan hijau muda di separuh bawahnya.
const B = ({ children }: { children: ReactNode }) => (
  <b className="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--primary-lighter)_58%)] px-0.5 font-semibold text-ink">
    {children}
  </b>
)

/** Langkah 1: pilih mentor (foto mentor + kartu daftar mentor mini, berlatar gradasi hijau) */
function PickMentor() {
  return (
    <div className="relative h-full">
      {/* Gradasi hijau di belakang kartu: memudar penuh di dalam area sendiri, jadi tidak terpotong di tepi (HP) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_40%_42%_at_66%_64%,var(--primary-light),var(--primary-lighter)_55%,transparent_100%),radial-gradient(ellipse_28%_28%_at_28%_24%,var(--primary-lighter),transparent_100%)] opacity-70 md:-inset-8 md:blur-xl"
      />

      <img
        src="/images/mentors/afdal-adam.webp"
        alt=""
        width={800}
        height={800}
        className="absolute top-[2%] left-[4%] h-[84%] w-[40%] rounded-2xl md:top-[1%] md:left-[7%] md:h-[86%] object-cover object-[50%_20%] shadow-lg"
      />

      <span className="absolute top-[4%] left-[47%] z-10 rounded-full bg-primary-darker px-3 py-1.5 text-caption font-semibold md:top-[18%] md:left-[50%] md:px-4 md:py-2 md:text-small text-white shadow-md">
        Pilih mentor
      </span>
      <svg aria-hidden viewBox="0 0 40 40" className="absolute top-[14%] left-[76%] z-10 size-6 text-ink md:top-[25%] md:left-[73%] md:size-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4c14 1 24 8 25 26" />
        <path d="M21 25l6 6 6-7" />
      </svg>

      <div className="absolute right-[3%] bottom-[2%] w-[48%] rounded-2xl border border-white bg-card p-2 shadow-lg md:right-[5%] md:bottom-0 md:w-[46%] md:p-2.5">
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-10 rounded-full bg-primary-lighter" />
          <span className="h-3 w-7 rounded-full bg-primary" />
        </div>
        <div className="mt-2 flex gap-1">
          {[10, 8, 8, 8].map((w, i) => (
            <span key={i} className={`h-3.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary-subtle'}`} style={{ width: `${w * 4}px` }} />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-lg bg-primary-subtle p-1.5">
              <span className="mx-auto flex size-5 items-center justify-center rounded-full bg-primary-lighter text-primary-darker">
                <User size={11} strokeWidth={2} />
              </span>
              <span className="mt-1.5 block h-1 rounded-full bg-primary-lighter" />
              <span className="mt-1 block h-1 w-2/3 rounded-full bg-primary-lighter/70" />
              <span className="mt-1.5 ml-auto block h-2 w-5 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Langkah 2: kartu "Rincian sesi" seperti di halaman profil mentor */
function BookSession() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--primary-light)_0%,var(--primary-lighter)_45%,transparent_70%)] opacity-70 blur-2xl" />
      <div className="relative w-[370px] shrink-0 scale-[0.6] rounded-2xl border border-border bg-card p-6 shadow-lg sm:scale-[0.72] md:scale-[0.82]">
        <h3 className="text-h3 text-ink">Rincian sesi</h3>
        <dl className="mt-5 flex flex-col gap-4 border-y border-border py-5 text-small">
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Clock size={16} strokeWidth={1.75} /> Durasi sesi
            </dt>
            <dd className="font-medium text-ink">60 menit</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Video size={16} strokeWidth={1.75} /> Format
            </dt>
            <dd className="text-right font-medium text-ink">Online via Google Meet</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Wallet size={16} strokeWidth={1.75} /> Biaya
            </dt>
            <dd className="text-h3 text-ink">Rp 300.000</dd>
          </div>
        </dl>
        <div className="mt-5">
          <p className="text-caption font-medium text-muted-foreground">Jadwal tersedia (usulan)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Kam, 26 Nov · 14.00', 'Jum, 27 Nov · 19.30', 'Sen, 30 Nov · 09.00'].map((t) => (
              <span key={t} className="rounded-full bg-primary-subtle px-3 py-1 text-caption font-medium text-primary-dark">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary-darker text-body font-semibold text-white">
          Booking sesi
        </div>
        <p className="mt-4 flex gap-2 text-caption leading-relaxed text-muted-foreground">
          <Info size={14} strokeWidth={1.75} className="mt-0.5 shrink-0" />
          Booking diteruskan ke mentor untuk dikonfirmasi. Mentor merespons dalam 24 jam.
        </p>
      </div>
    </div>
  )
}

/** Langkah 3: foto panggilan video + kartu "Sesi dikonfirmasi" yang menumpang di bawahnya */
function StartSession() {
  return (
    <div className="relative mx-auto h-full w-[92%]">
      <div className="absolute inset-x-0 top-[3%] h-[72%] overflow-hidden rounded-3xl shadow-lg">
        <img
          src="/images/video-call.webp"
          alt=""
          width={1600}
          height={900}
          className="size-full origin-[50%_30%] scale-[1.5] object-cover object-[50%_22%]"
        />
      </div>

      <div className="absolute inset-x-[6%] bottom-0 rounded-2xl border border-primary-lighter bg-primary-subtle p-3 shadow-lg md:p-3.5">
        <div className="flex items-center gap-2">
          <Video size={16} strokeWidth={1.75} className="shrink-0 text-primary-darker" />
          <p className="text-small font-semibold text-ink">Sesi dikonfirmasi</p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-primary-lighter bg-card px-2.5 py-1.5">
          <span className="flex min-w-0 items-center gap-1.5 text-caption font-medium text-ink">
            <Video size={13} strokeWidth={1.75} className="shrink-0 text-primary-darker" />
            <span className="truncate">meet.google.com/abc-defg-hij</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-input px-2 py-0.5 text-[11px] font-medium text-ink">
            <Copy size={11} strokeWidth={1.75} /> Salin
          </span>
        </div>
      </div>
    </div>
  )
}

const steps: { title: string; text: ReactNode; illustration: ReactNode; chip: string }[] = [
  {
    title: 'Pilih mentor',
    chip: 'Cari sesuai topik',
    illustration: <PickMentor />,
    text: (
      <>
        Cari mentor sesuai <B>topik masalah</B> bisnismu, lalu lihat <B>profil dan rekam jejaknya</B>.
      </>
    ),
  },
  {
    title: 'Booking sesi',
    chip: 'Tanpa daftar akun',
    illustration: <BookSession />,
    text: (
      <>
        Pilih <B>jadwal</B> dan isi kebutuhanmu. <B>Tanpa daftar akun</B>, cukup nama usaha dan email. Mentor merespons
        dalam <B>24 jam</B>.
      </>
    ),
  },
  {
    title: 'Sesi via Google Meet',
    chip: 'Ngobrol 1-on-1',
    illustration: <StartSession />,
    text: (
      <>
        Setelah mentor menerima dan kamu membayar, <B>link Google Meet</B> dikirim ke emailmu. Ngobrol 1-on-1, pulang
        bawa <B>langkah konkret</B>.
      </>
    ),
  },
]

export default function HowItWorks() {
  const reduceMotion = usePrefersReducedMotion()
  const wrap = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0) // 0..1 sepanjang section yang "tertahan"
  const [manual, setManual] = useState(0)
  // Di layar kecil tidak ada scroll yang tertahan: semua langkah tampil bertumpuk dengan gambarnya masing-masing
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Section dibuat tinggi dan isinya sticky: scroll tertahan di sini sampai ketiga langkah selesai.
  useEffect(() => {
    if (reduceMotion || !wide) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = wrap.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      setProgress(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduceMotion, wide])

  const active = !wide ? -1 : reduceMotion ? manual : Math.min(steps.length - 1, Math.floor(progress * steps.length))
  // Isi garis tiap langkah: 0..1
  const fill = (i: number) => (!wide ? 1 : reduceMotion ? (i <= manual ? 1 : 0) : Math.min(1, Math.max(0, progress * steps.length - i)))

  return (
    <section
      ref={wrap}
      id="cara-kerja"
      aria-labelledby="how-title"
      className={`overflow-x-clip px-4 py-20 sm:px-8 md:py-0 ${reduceMotion ? 'md:pb-28' : 'md:h-[190svh]'}`}
    >
      <div className={reduceMotion ? '' : 'md:sticky md:top-0 md:flex md:h-svh md:items-center md:pt-20'}>
        <div className="mx-auto w-full max-w-5xl">
          <h2 id="how-title" className="text-center text-section text-ink">
            Cara kerja
          </h2>
          <p className="mt-3 text-center text-body text-muted-foreground">Hanya dalam 3 langkah.</p>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-8 md:mt-12 md:grid-cols-[1.05fr_1fr] md:gap-14">
            {/* Gambar kiri: berganti mengikuti langkah yang aktif */}
            <div aria-hidden className="relative hidden h-64 sm:h-72 md:block md:h-80">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className={`absolute inset-0 transition-[opacity,scale] duration-500 ease-out motion-reduce:transition-none ${
                    i === active ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
                  }`}
                >
                  <div className="h-full">{s.illustration}</div>
                  
                </div>
              ))}
            </div>

            {/* Semua langkah selalu terlihat penuh; hanya garis vertikal yang beranimasi */}
            <ol className="flex flex-col gap-1">
              {steps.map((s, i) => {
                const on = !wide || i === active
                const Tag = reduceMotion && wide ? 'button' : 'div'
                return (
                  <li key={s.title} className="relative min-w-0">
                    <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 overflow-hidden rounded-full bg-border">
                      <span className="block w-full origin-top rounded-full bg-primary-darker" style={{ height: '100%', transform: `scaleY(${fill(i)})` }} />
                    </span>
                    <Tag
                      {...(reduceMotion && wide ? { type: 'button' as const, onClick: () => setManual(i) } : {})}
                      aria-current={on ? 'step' : undefined}
                      className={`block w-full py-3 pr-2 pl-6 text-left md:py-4 ${reduceMotion && wide ? 'cursor-pointer' : ''}`}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={`flex size-12 shrink-0 items-center justify-center rounded-full text-h3 transition-colors duration-300 ${
                            on ? 'bg-primary-darker text-white' : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="block">
                          <span className={`block text-h3 transition-colors duration-300 ${on ? 'text-ink' : 'text-muted-foreground'}`}>{s.title}</span>
                          <span className="mt-1.5 block text-small leading-relaxed text-muted-foreground md:text-body">{s.text}</span>
                        </span>
                      </span>
                      <span aria-hidden className="relative mt-5 block h-64 overflow-x-clip md:hidden">
                        {s.illustration}
                      </span>
                    </Tag>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
