import {
  CalendarClock,
  Check,
  CreditCard,
  Hourglass,
  Search,
  SearchX,
  UserRoundSearch,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge, Chip } from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import MentorCard from "../../components/ui/MentorCard";
import {
  searchWords,
  usePrefersReducedMotion,
  useTypewriter,
} from "../../hooks/useTypewriter";
import DocSection, { PageHeader } from "./DocSection";

const needs = ["Harga & HPP", "Promosi", "Keuangan", "Pelanggan tetap"];
const slots = ["Sen · 10.00", "Rab · 14.00", "Jum · 19.30"];
const stages = [
  "Booking terkirim",
  "Respons mentor",
  "Pembayaran",
  "Link Meet",
];

type StatusTone = "amber" | "success" | "info" | "danger";

function StatusCard({
  tone,
  badge,
  Icon,
  title,
  body,
  action,
  secondary,
}: {
  tone: StatusTone;
  badge: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  action?: string;
  secondary?: boolean;
}) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <Icon
          size={24}
          strokeWidth={1.75}
          className="text-primary-darker"
          aria-hidden
        />
        <Badge tone={tone}>{badge}</Badge>
      </div>
      <h3 className="text-h3 text-ink">{title}</h3>
      <p className="text-small text-muted-foreground">{body}</p>
      {action && (
        <Button
          className="mt-auto self-start"
          variant={secondary ? "secondary" : "primary"}
        >
          {action}
        </Button>
      )}
    </article>
  );
}

const topics = [
  "Semua",
  "Harga & HPP",
  "Promosi",
  "Keuangan",
  "Pelanggan tetap",
];

const mentors = [
  {
    name: "Mentor Contoh 1",
    initials: "M1",
    headline: "Spesialis harga & promosi",
    rating: 4.8,
    reviews: 24,
    topics: ["Harga & HPP", "Promosi"],
    price: "Rp 75.000",
  },
  {
    name: "Mentor Contoh 2",
    initials: "M2",
    headline: "Pengelolaan keuangan UMKM",
    rating: 4.6,
    reviews: 12,
    topics: ["Keuangan"],
    price: "Rp 90.000",
  },
  {
    name: "Mentor Contoh 3",
    initials: "M3",
    headline: "Strategi pelanggan tetap",
    rating: 4.9,
    reviews: 31,
    topics: ["Pelanggan tetap", "Promosi"],
    price: "Rp 80.000",
  },
];

function Skeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-4">
        <div className="size-14 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        </div>
      </div>
      <div className="h-3 w-1/3 animate-pulse rounded bg-muted motion-reduce:animate-none" />
      <div className="h-9 w-full animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
    </div>
  );
}

/** Contoh kolom pencarian pil dengan placeholder yang mengetik sendiri (sama dengan beranda dan Daftar Mentor). */
function SearchDemo() {
  const [q, setQ] = useState("");
  const reduce = usePrefersReducedMotion();
  const typed = useTypewriter(searchWords, q === "" && !reduce);
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-md transition-[border-color,box-shadow] duration-200 focus-within:border-primary-darker focus-within:shadow-lg"
    >
      <Search
        size={20}
        strokeWidth={1.75}
        className="shrink-0 text-muted-foreground"
        aria-hidden
      />
      <div className="group relative min-w-0 flex-1">
        <label htmlFor="ds-search" className="sr-only">
          Cari mentor berdasarkan topik atau keahlian
        </label>
        <input
          id="ds-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
          className="min-h-12 w-full bg-transparent text-body text-ink outline-none"
        />
        {q === "" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-body text-muted-foreground"
          >
            Cari mentor untuk&nbsp;
            <span className="text-ink">{reduce ? searchWords[0] : typed}</span>
            <span className="ml-0.5 h-5 w-px animate-pulse bg-ink group-focus-within:hidden motion-reduce:animate-none" />
          </span>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-highlight px-6 text-small font-semibold text-ink transition-colors duration-200 hover:bg-highlight-light"
      >
        Cari mentor
      </button>
    </form>
  );
}

export default function PatternsPage() {
  const [topic, setTopic] = useState("Semua");
  const [need, setNeed] = useState("Harga & HPP");
  const [slot, setSlot] = useState("Rab · 14.00");
  const shown =
    topic === "Semua"
      ? mentors
      : mentors.filter((m) => m.topics.includes(topic));

  return (
    <div className="flex flex-col gap-14">
      <PageHeader
        eyebrow="Komponen"
        title="Patterns"
        intro="Gabungan komponen untuk alur utama Sorota tanpa akun: cari mentor → booking → respons mentor → bayar → sesi via Google Meet. Nama, harga, dan kalimat di contoh hanya ilustrasi."
      />

      <DocSection
        title="Explore mentor"
        description="Cari dan saring mentor berdasarkan topik masalah bisnis. Cocok untuk pengguna yang belum pernah mentoring dan belum tahu harus mulai dari mana."
        notes={[
          "Filter topik memakai bahasa masalah pengguna (harga, promosi), bukan istilah teknis.",
          "Hasil yang kosong selalu menampilkan pesan dan langkah berikutnya (lihat Empty state).",
        ]}
      >
        <div className="flex flex-col gap-5">
          <div className="relative">
            <Search
              size={20}
              strokeWidth={1.75}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              aria-label="Cari mentor"
              placeholder="Cari mentor atau topik, contoh: promosi"
              className="min-h-11 w-full rounded-lg border border-input bg-card pr-3 pl-10 text-body text-ink placeholder:text-muted-foreground hover:border-muted-foreground focus:border-primary-darker"
            />
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter topik"
          >
            {topics.map((t) => (
              <Chip key={t} selected={topic === t} onClick={() => setTopic(t)}>
                {t}
              </Chip>
            ))}
          </div>
          <p className="text-small text-muted-foreground" aria-live="polite">
            {shown.length} mentor ditemukan
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {shown.map((m) => (
              <MentorCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Form booking"
        description="Tanpa akun: cukup kebutuhan, jadwal, nama usaha, dan email. Error tampil singkat di kolom yang salah, isian lain tetap tersimpan."
        notes={[
          "Satu kolom lebih mudah dipindai dan diselesaikan di HP.",
          "Ada ringkasan sebelum kirim (lihat di bawah).",
          "Tombol kirim tetap aktif; validasi muncul saat diklik supaya pengguna tahu apa yang kurang.",
        ]}
      >
        <form
          className="mx-auto flex max-w-md flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-small font-medium text-ink">
              Kebutuhan
            </legend>
            <div className="flex flex-wrap gap-2">
              {needs.map((n) => (
                <Chip key={n} selected={need === n} onClick={() => setNeed(n)}>
                  {n}
                </Chip>
              ))}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-small font-medium text-ink">
              Jadwal
            </legend>
            <div className="flex flex-wrap gap-2">
              {slots.map((t) => (
                <Chip key={t} selected={slot === t} onClick={() => setSlot(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </fieldset>
          <Field label="Nama usaha" placeholder="Contoh: Es Teh Manis Jenie" />
          <Field
            label="Email"
            type="email"
            defaultValue="nama@email"
            error="Email belum lengkap. Tulis lengkap dengan domain, contoh: nama@gmail.com."
            helper="Status booking dikirim ke email ini."
          />
          <Button size="lg" type="submit">
            Lanjut ke ringkasan
          </Button>
        </form>
      </DocSection>

      <DocSection
        title="Ringkasan sebelum kirim"
        description="Tampilkan apa yang dipilih sebelum booking dikirim. Pembayaran belum diminta di tahap ini."
        notes={[
          "Beri tahu urutan berikutnya: mentor merespons, lalu pembayaran, lalu link Meet dikirim.",
          "Angka di atas hanya contoh.",
        ]}
      >
        <article className="mx-auto flex max-w-md flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-h3 text-ink">Cek lagi bookingmu</h3>
          <dl className="flex flex-col gap-3 text-small">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Mentor</dt>
              <dd className="text-ink">Mentor Contoh 1</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Kebutuhan</dt>
              <dd className="text-ink">{need}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Jadwal</dt>
              <dd className="text-ink">{slot}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Usaha</dt>
              <dd className="text-ink">Es Teh Manis Jenie</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-border pt-3">
              <dt className="font-semibold text-ink">Tarif sesi</dt>
              <dd className="text-h3 text-ink">Rp 75.000</dd>
            </div>
          </dl>
          <p className="rounded-lg bg-muted px-4 py-3 text-caption text-muted-foreground">
            Kamu belum bayar sekarang. Mentor merespons dulu (maks. 24 jam),
            baru kamu diminta membayar.
          </p>
          <Button size="lg">Booking sesi</Button>
        </article>
      </DocSection>

      <DocSection
        title="Status booking"
        description="Dibuka lewat link di email, tanpa login. Setiap status menjelaskan situasinya dan memberi satu langkah berikutnya."
        notes={[
          'Stepper memakai aria-current="step" pada tahap aktif.',
          "Penolakan tidak pernah jadi jalan buntu: selalu ada langkah berikutnya (jadwal lain atau mentor lain).",
          "Maksimal 2 kali ganti jadwal. Aturan setelahnya belum ditentukan.",
        ]}
      >
        <div className="flex flex-col gap-8">
          <ol className="grid gap-3 sm:grid-cols-4" aria-label="Tahap booking">
            {stages.map((st, i) => {
              const state = i < 1 ? "done" : i === 1 ? "current" : "todo";
              return (
                <li
                  key={st}
                  aria-current={state === "current" ? "step" : undefined}
                  className="flex items-center gap-3 sm:flex-col sm:items-start"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-caption font-semibold ${
                      state === "done"
                        ? "bg-primary-darker text-white"
                        : state === "current"
                          ? "border-2 border-primary-darker bg-primary-subtle text-primary-dark"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {state === "done" ? <Check size={16} aria-hidden /> : i + 1}
                  </span>
                  <span
                    className={`text-small ${state === "todo" ? "text-muted-foreground" : "font-semibold text-ink"}`}
                  >
                    {st}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="grid gap-4 md:grid-cols-2">
            <StatusCard
              tone="amber"
              badge="Menunggu konfirmasi"
              Icon={Hourglass}
              title="Booking terkirim"
              body="Mohon tunggu respons mentor dalam 24 jam. Kami kirim emailnya begitu ada kabar."
            />
            <StatusCard
              tone="success"
              badge="Diterima, menunggu pembayaran"
              Icon={CreditCard}
              title="Mentor menerima bookingmu"
              body="Selesaikan pembayaran untuk mendapat link Google Meet."
              action="Bayar sekarang"
            />
            <StatusCard
              tone="info"
              badge="Jadwal tidak cocok"
              Icon={CalendarClock}
              title="Mentor minta jadwal lain"
              body="Isianmu tersimpan. Pilih jam kosong lain dari mentor yang sama (maksimal 2 kali)."
              action="Pilih jadwal lain"
            />
            <StatusCard
              tone="danger"
              badge="Tidak bisa diterima"
              Icon={UserRoundSearch}
              title="Mentor belum bisa menerima"
              body="Tenang, masih banyak mentor lain yang cocok untuk kebutuhanmu."
              action="Pilih mentor lain"
              secondary
            />
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Empty state"
        description="Hasil kosong selalu menjelaskan situasinya dan memberi langkah berikutnya."
        notes={["Satu ikon, satu kalimat penjelasan, satu aksi utama."]}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center gap-3 py-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary-subtle text-primary-darker">
            <SearchX size={28} strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="text-h3 text-ink">Belum ada mentor untuk topik ini</h3>
          <p className="text-small text-muted-foreground">
            Coba topik lain atau hapus filternya untuk lihat semua mentor.
          </p>
          <Button className="mt-2" variant="secondary">
            Hapus filter
          </Button>
        </div>
      </DocSection>

      <DocSection
        title="Pencarian dengan animasi ketik"
        description="Kolom pencarian berbentuk pil di hero beranda dan Daftar Mentor. Placeholder mengetik contoh kebutuhan, dan berhenti begitu pengguna mulai mengetik."
        notes={[
          "Saat fokus, hanya border luar yang berubah menjadi hijau Darker. Jangan menambah outline kedua di dalam kolom.",
          "Tombol Cari memakai Highlight (kuning) dengan teks Ink: satu-satunya aksen kuning di area ini.",
          "Bagi pengguna reduce motion, placeholder menampilkan kata pertama saja tanpa animasi.",
        ]}
      >
        <SearchDemo />
      </DocSection>

      <DocSection
        title="Pita hijau halaman"
        description="Kepala halaman Tentang dan Daftar Mentor: pita gradasi hijau dengan tepi bawah bergelombang, lalu konten menyambung ke latar halaman."
        notes={[
          "Teks di atas pita memakai Ink. Kartu putih di dalam pita (Daftar Mentor) memakai radius 2XL dan shadow LG.",
        ]}
      >
        <div className="relative overflow-hidden rounded-xl bg-background">
          <div className="relative bg-linear-to-b from-primary-lighter via-primary-light/60 to-primary-lighter px-6 pt-10 pb-16 text-center">
            <p className="text-h1 text-ink">Judul halaman</p>
            <p className="mt-2 text-small text-ink/75">
              Satu kalimat pembuka tentang halaman ini.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              className="absolute inset-x-0 -bottom-px h-8 w-full text-background"
              fill="currentColor"
            >
              <path d="M0 40c240-34 480-34 720-8s480 20 720-12v40H0Z" />
            </svg>
          </div>
          <div className="h-10" aria-hidden />
        </div>
      </DocSection>

      <DocSection
        title="Loading state"
        description="Skeleton menjaga tata letak tetap stabil saat data dimuat, sehingga halaman tidak melompat."
        notes={[
          "Animasi berhenti otomatis bagi pengguna yang mengaktifkan reduce motion.",
        ]}
      >
        <div
          role="status"
          aria-label="Memuat daftar mentor"
          className="grid gap-4 lg:grid-cols-3"
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </DocSection>
    </div>
  );
}
