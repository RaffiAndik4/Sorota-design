import Avatar from '../../components/ui/Avatar'
import { mentors } from '../../data/mentors'
import MentorSearch from './MentorSearch'

// Copy mengikuti docs/brand-guideline.md dan docs/sitemap-user-flow.md.
// Tidak ada angka rating/ulasan/anggota karena belum ada data nyata.
const copy = {
  headlineTop: 'Bukan Sekadar Punya Ide.',
  headlineMain: 'Temukan Arah Bisnismu.',
  sub: 'Framework dan pendampingan bisnis untuk membantu kamu menemukan peluang, memvalidasi ide, dan menentukan langkah bisnis dengan lebih terukur.',
}

// Latar: deretan pita vertikal bertepi tegas dengan garis tipis di antaranya. Di dalam tiap pita ada gradasi warna
// yang buram (pekat di tengah, memudar ke atas & bawah). Semuanya memudar ke tengah agar teks mudah dibaca.
// Setiap pita: [token warna, kekuatan %, posisi vertikal puncak warna %].
// Setengah kiri didefinisikan, setengah kanan dicerminkan agar simetris.
type Band = [string, number, number]
const half: Band[] = [
  ['primary-light', 52, 58],
  ['primary-lighter', 90, 46],
  ['primary-light', 34, 64],
  ['primary-lighter', 70, 52],
  ['primary-light', 46, 60],
  ['primary-lighter', 84, 44],
  ['primary-light', 30, 56],
  ['primary-lighter', 62, 50],
]
const bands: Band[] = [...half, ...[...half].reverse()]

// Tekstur butiran (SVG feTurbulence), dibuat sekali & dipakai sebagai background-image.
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>" +
  "<filter id='n' x='0' y='0' width='100%25' height='100%25'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix values='0 0 0 0 0.06  0 0 0 0 0.14  0 0 0 0 0.07  1.4 0 0 0 -0.45'/></filter>" +
  "<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"

// Bagian tengah dibiarkan bersih; pita hanya terlihat di sisi kiri & kanan.
const fadeToCenter =
  'linear-gradient(to right, #000 0%, #000 18%, rgba(0,0,0,.7) 30%, transparent 46%, transparent 54%, rgba(0,0,0,.7) 70%, #000 82%, #000 100%)'

/** Latar dekoratif. Tidak berisi informasi, jadi disembunyikan dari pembaca layar. */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Pita warna */}
      <div
        className="absolute inset-0 flex opacity-80 sm:opacity-100"
        style={{ maskImage: fadeToCenter, WebkitMaskImage: fadeToCenter }}
      >
        {bands.map(([token, strength, peak], i) => (
          <div
            key={i}
            className="relative flex-1 overflow-hidden"
            // Garis tipis: tepi terang di satu sisi dan tepi gelap sangat samar di sisi lain
            style={{ boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.85), inset 1px 0 0 rgba(16,21,16,0.035)' }}
          >
            {/* Nuansa abu sangat tipis agar pita terasa berbeda dari latar */}
            <div className="absolute inset-0 bg-ink/[0.015]" />
            {/* Gradasi warna buram di dalam pita */}
            <div
              className="absolute -inset-x-4 inset-y-0 blur-xl"
              style={{
                background: `radial-gradient(ellipse 85% 62% at 50% ${peak}%, color-mix(in srgb, var(--${token}) ${strength}%, transparent), transparent 72%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Memudar ke warna latar di bagian bawah */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background to-transparent" />

      {/* Tekstur butiran: tipis, di atas pita tetapi di belakang teks */}
      <div className="absolute inset-0 opacity-[0.09] mix-blend-multiply" style={{ backgroundImage: grain, backgroundSize: '240px 240px', maskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)' }} />
    </div>
  )
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      // Penuh layar tanpa margin/radius. Isi dipusatkan vertikal (padding atas = bawah, cukup besar agar tidak tertutup navbar kaca).
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-background"
    >
      <Backdrop />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 pt-28 pb-24 text-center sm:px-8 sm:pb-36">
        <h1 id="hero-title" className="text-hero text-balance text-ink">
          <span className="block">{copy.headlineTop}</span>
          <span className="block text-primary-darker">{copy.headlineMain}</span>
        </h1>

        <p className="max-w-2xl text-body text-muted-foreground md:text-lg">{copy.sub}</p>

        <MentorSearch />

        {/* Foto mentor bertumpuk di dasar hero. Teks memakai jumlah mentor yang benar-benar ada, bukan angka klaim. */}
        <div className="flex flex-col items-center gap-1.5 sm:absolute sm:inset-x-0 sm:bottom-28">
          <ul className="flex -space-x-2" aria-hidden>
            {mentors.map((m) => (
              <li key={m.id}>
                <Avatar name={m.name} size={32} tone={m.index} src={m.photo} pos={m.photoPos} className="ring-2 ring-white" />
              </li>
            ))}
          </ul>
          <p className="text-caption font-medium text-muted-foreground">{mentors.length} mentor siap mendampingi bisnismu</p>
        </div>
      </div>

    </section>
  )
}
