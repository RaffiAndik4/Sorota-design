import Avatar from '../../components/ui/Avatar'
import { mentors } from '../../data/mentors'
import MentorSearch from './MentorSearch'

// Copy mengikuti docs/brand-guideline.md dan docs/sitemap-user-flow.md.
// Tidak ada angka rating/ulasan/anggota karena belum ada data nyata.
const copy = {
  sub: 'Dapatkan sudut pandang baru dari mentor berpengalaman. Bahas kendala bisnismu dan temukan langkah selanjutnya bersama Sorota.',
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

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-4 pt-24 pb-6 text-center sm:gap-8 sm:px-8 sm:pb-16">
        {/* HP: huruf besar, lima baris yang dipenggal manual. Layar sm ke atas: tiga baris. */}
        <h1
          id="hero-title"
          className="text-[length:min(9vw,2.5rem)] leading-[1.18] font-bold tracking-tight text-ink sm:text-[length:min(calc((100vw-5rem)/14),3.5rem)] sm:leading-[1.2] sm:whitespace-nowrap"
        >
          <span className="sm:block">
            <b>Hadapi Tantangan <br className="sm:hidden" />
            Bisnis</b>{' '}
          </span>
          <span className="sm:block">
            <b>Bersama <br className="sm:hidden" />
            Mentor yang Tepat.</b>
          </span>
          <span className="block text-primary-darker">
            Temukan Arah <br className="sm:hidden" />
            Bisnismu.
          </span>
        </h1>

        <p className="max-w-2xl text-body text-muted-foreground md:text-lg">{copy.sub}</p>

        <MentorSearch />

        {/* Foto mentor bertumpuk di bawah pencarian. Teks memakai jumlah mentor yang benar-benar ada, bukan angka klaim. */}
        <div className="mt-12 flex flex-col items-center gap-1.5 sm:mt-4 lg:relative lg:top-12">
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
