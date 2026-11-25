import {
  CalendarCheck,
  Map,
  MessageCircle,
  Scale,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import ClosingCta from "../../components/layout/ClosingCta";
import { Ring, Sparkle } from "../../components/ui/Decor";
import { useInView } from "../../hooks/useInView";
import { usePageTitle } from "../../hooks/usePageTitle";

// Isi halaman mengikuti naskah "Tentang Sorota" dari tim.
// Huruf S-O-R-O-T-A: tiap tahap diambil dari nama Sorota.
const stages = [
  {
    letter: "s",
    title: "Self Discovery",
    body: "Kenali diri & potensi bisnis",
  },
  {
    letter: "o",
    title: "Opportunity Mapping",
    body: "Temukan peluang yang relevan",
  },
  {
    letter: "r",
    title: "Relevance Scoring",
    body: "Tentukan arah yang paling tepat",
  },
  {
    letter: "o",
    title: "Offer Design",
    body: "Ubah arah menjadi sesuatu yang bisa dijual",
  },
  { letter: "t", title: "Test & Traction", body: "Uji sebelum berkembang" },
  {
    letter: "a",
    title: "Accelerate",
    body: "Kembangkan bisnis yang sudah terbukti",
  },
];

const differences: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: "Mulai dari dirimu",
    body: "Arah bisnis disusun dari kemampuan, minat, dan kondisimu, bukan dari tren orang lain.",
    Icon: UserRound,
  },
  {
    title: "Peluang yang dipetakan",
    body: "Bukan satu ide yang langsung dieksekusi, tapi beberapa peluang yang ditimbang lebih dulu.",
    Icon: Map,
  },
  {
    title: "Keputusan yang terukur",
    body: "Peluang dibandingkan lewat kriteria yang jelas, supaya pilihanmu punya alasan.",
    Icon: Scale,
  },
  {
    title: "Pendampingan 1-on-1",
    body: "Setiap tahap didampingi praktisi, bukan dijalani sendirian lewat modul.",
    Icon: MessageCircle,
  },
  {
    title: "Jadwal fleksibel",
    body: "Booking kapan pun kamu siap, tanpa perlu menyesuaikan jadwal orang lain.",
    Icon: CalendarCheck,
  },
  {
    title: "Mentor terseleksi",
    body: "Baca profil dan ulasan sebelum booking. Tidak perlu khawatir salah pilih.",
    Icon: ShieldCheck,
  },
];

// Empat foto di bawah judul; ukuran dan posisinya dibuat bertingkat.
const gallery = [
  { src: "/images/mentors/afdal-adam.webp", pos: "50% 25%" },
  { src: "/images/mentors/suwastika-wijayanti.webp", pos: "50% 35%" },
  { src: "/images/mentors/risa-agung-pribadi.webp", pos: "50% 32%" },
  { src: "/images/video-call.webp", pos: "50% 25%" },
];

/** Muncul halus saat di-scroll (diputar ulang tiap masuk layar). */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  usePageTitle("Tentang Sorota");

  return (
    <>
      {/* Judul di atas pita hijau; foto menjuntai melewati tepi bawah pita */}
      <section
        aria-labelledby="about-title"
        className="relative bg-background pb-16 md:pb-24"
      >
        <div className="relative bg-linear-to-b from-primary-lighter via-primary-light/60 to-primary-lighter px-4 pt-36 pb-32 sm:px-8 md:pb-44">
          <Sparkle className="absolute top-30 left-[69%] hidden size-7 md:block" />
          <Ring className="absolute top-28 left-[75%] hidden size-3 md:block" />
          <Ring className="absolute top-38 left-[78%] hidden size-4 md:block" />
          <Ring className="absolute top-44 left-[72%] hidden size-3 md:block" />
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="about-title" className="text-section text-balance text-ink">
              Tentang Sorota
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body leading-relaxed text-ink/75 md:text-lg">
              Sorota membantu kamu menemukan arah bisnis lewat framework enam
              tahap dan pendampingan one-on-one bersama praktisi.
            </p>
          </div>
          {/* Tepi bawah pita bergelombang */}
          <svg
            aria-hidden
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="absolute inset-x-0 -bottom-px h-8 w-full text-background md:h-12"
            fill="currentColor"
          >
            <path d="M0 40c240-34 480-34 720-8s480 20 720-12v40H0Z" />
          </svg>
        </div>

        <ul className="relative z-10 mx-auto -mt-24 grid max-w-6xl grid-cols-2 items-start gap-3 px-4 sm:px-8 md:-mt-32 md:grid-cols-4 md:gap-5">
          {gallery.map((g, i) => (
            <li key={g.src} className={i % 2 === 1 ? "md:mt-12" : ""}>
              <Reveal delay={i * 100}>
                <img
                  src={g.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`w-full rounded-2xl border-4 border-white object-cover shadow-lg ${i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
                  style={{ objectPosition: g.pos }}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Kenapa Sorota ada */}
      <section
        aria-labelledby="kenapa-title"
        className="px-4 py-12 sm:px-8 md:py-20"
      >
        <Reveal className="mx-auto max-w-6xl">
          <h2
            id="kenapa-title"
            className="max-w-2xl text-h1 text-balance text-ink"
          >
            Punya ide bisnis itu mudah. Tahu mana yang layak dijalankan, tidak.
          </h2>
          <div className="mt-8 grid gap-6 text-body leading-relaxed text-muted-foreground md:grid-cols-2 md:gap-14">
            <p>
              Banyak orang berhenti bukan karena kurang niat, tapi karena tidak
              tahu harus mulai dari mana. Idenya bertumpuk tanpa pernah diuji,
              atau langsung dieksekusi tanpa pernah ditimbang lebih dulu.
            </p>
            <p>
              Sorota hadir untuk menutup celah itu. Framework enam tahap yang
              dimulai dari mengenali diri, memetakan peluang, sampai mengujinya
              ke pasar, dengan praktisi yang mendampingi di setiap tahapnya.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Foto dengan kartu melayang + kutipan */}
      <section
        aria-labelledby="arah-title"
        className="px-4 py-12 sm:px-8 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-16">
          <Reveal className="relative pb-10">
            <img
              src="/images/hero-main.jpg"
              alt="Pemilik usaha tersenyum di ruang kerjanya"
              width={1000}
              height={1777}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-3xl object-cover object-[50%_30%] shadow-lg"
            />
            <div className="absolute bottom-0 left-6 rounded-2xl bg-card px-6 py-4 shadow-lg">
              <p className="text-h3 text-ink">6 tahap, 1-on-1</p>
              <p className="text-small text-muted-foreground">
                Framework Sorota, jadwal fleksibel
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 id="arah-title" className="text-h1 text-balance text-ink">
              Arah yang jelas untuk setiap orang.
            </h2>
            <p className="mt-5 text-body leading-relaxed text-muted-foreground">
              Kami percaya setiap orang berhak punya arah yang jelas, tanpa
              harus punya koneksi atau bayar mahal untuk konsultasi profesional.
            </p>
            <blockquote className="mt-6 border-l-4 border-highlight pl-5 text-body font-semibold text-ink italic">
              Satu ekosistem untuk menemukan, membangun, dan mengembangkan
              bisnis yang sesuai dengan{" "}
              <span className="text-primary-darker">
                kemampuan diri setiap individu.
              </span>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Framework Sorota */}
      <section
        aria-labelledby="framework-title"
        className="px-4 py-12 sm:px-8 md:py-20"
      >
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <h2 id="framework-title" className="text-h1 text-balance text-ink">
              Enam tahap, diambil dari nama kami sendiri.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-body text-muted-foreground">
              Urutannya bukan hiasan. Tiap tahap menutup pertanyaan yang harus
              terjawab sebelum tahap berikutnya masuk akal untuk dijalankan.
            </p>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-12 rounded-3xl border border-border bg-card px-6 py-10 shadow-md sm:px-10"
          >
            <ol className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
              {stages.map((s, i) => (
                <li key={s.title} className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className="flex size-16 items-center justify-center rounded-full bg-primary-darker text-h2 text-white shadow-md"
                  >
                    {s.letter}
                  </span>
                  <h3 className="mt-4 text-small font-semibold text-ink">
                    <span className="sr-only">Tahap {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-1 max-w-[11rem] text-caption leading-snug text-muted-foreground">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Yang membedakan kami: tiga kolom, ikon dalam bentuk blob */}
      <section
        aria-labelledby="beda-title"
        className="relative px-4 py-12 sm:px-8 md:py-20"
      >
        <Sparkle className="absolute top-10 right-[22%] hidden size-6 md:block" />
        <Ring className="absolute top-6 right-[18%] hidden size-2.5 md:block" />
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <h2
              id="beda-title"
              className="mx-auto max-w-2xl text-h1 text-balance text-ink"
            >
              Arah bisnis yang disusun, bukan ditebak.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body text-muted-foreground">
              Inilah yang membedakan cara Sorota mendampingimu.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {differences.map((d, i) => (
              <li key={d.title}>
                <Reveal
                  delay={(i % 3) * 100}
                  className="flex flex-col items-center text-center"
                >
                  <span className="flex size-20 items-center justify-center rounded-[58%_42%_52%_48%/48%_56%_44%_52%] bg-primary-lighter text-primary-dark">
                    <d.Icon size={32} strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-h3 text-ink">{d.title}</h3>
                  <p className="mt-2 max-w-xs text-small leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
